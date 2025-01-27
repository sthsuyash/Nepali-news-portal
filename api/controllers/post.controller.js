import prisma from "../config/prisma.js";
import { createResponse } from "../utils/responseModel.js";
import { paginate } from "../utils/pagination.js";
import { config } from "../config/index.js";
import { uploadSingle } from "../config/multer.js";
import cloudinary from "cloudinary";

const POSTS_URL = config.server.apiURL + "/posts";
const ADMIN_URL = POSTS_URL + "/admin";

const NEWS_ALGORITHM_API_URL = config.newsAlgorithm.apiURL;

const CLOUD_NAME = config.cloudinary.cloudName;
const CLOUDINARY_API_KEY = config.cloudinary.apiKey;
const CLOUDINARY_API_SECRET = config.cloudinary.apiSecret;
const CLOUDINARY_API_URL = config.cloudinary.url;

/** Public routes */

/**
 * Fetches the most recent active news posts with pagination.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getRecentPosts = async (req, res) => {
  let { page = 1, limit = 6, sortBy = "createdAt", order = "desc" } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  try {
    const total = await prisma.post.count({});
    const posts = await prisma.post.findMany({
      where: {
        sentiment: {
          // fetch positive or neutral sentiment posts
          OR: [
            { name: "POSITIVE" },
            { name: "NEUTRAL" },
          ],
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
    });

    const pagination = paginate(
      total,
      posts.length,
      page,
      limit,
      POSTS_URL + "/recent"
    );

    if (pagination.error) {
      return res
        .status(pagination.status)
        .json(createResponse(false, pagination.status, pagination.message));
    }

    return res.status(200).json(
      createResponse(true, 200, "Recent posts fetched successfully", {
        pagination,
        posts,
      })
    );
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(createResponse(false, 500, "Internal server error"));
  }
};

/**
 * Searches news posts based on a search value with pagination.
 * @param {Object} req - The Express request object containing search value in query.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const searchNews = async (req, res) => {
  let {
    q,
    page = 1,
    limit = 9,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  // Ensure page and limit are integers and apply a maximum limit
  page = parseInt(page);
  limit = Math.min(parseInt(limit), 10); // Limit the number of items per request to 100

  // Validate the search term `q`
  if (!q || q.trim().length === 0) {
    return res
      .status(400)
      .json(createResponse(false, 400, "Search value is required"));
  }

  // Validate sortBy to ensure it's a valid field
  const validSortFields = ["createdAt", "title", "description"]; // Add more if necessary
  if (!validSortFields.includes(sortBy)) {
    return res
      .status(400)
      .json(createResponse(false, 400, "Invalid sort field"));
  }

  try {
    // Count total number of posts matching the search query
    const total = await prisma.post.count({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
    });

    // Fetch posts matching the search query with pagination and sorting
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      skip: (page - 1) * limit, // Skip the posts based on current page
      take: limit, // Limit the number of posts returned
      orderBy: {
        [sortBy]: order, // Order by the selected field (createdAt, title, description)
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        image: true,
      },
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json(createResponse(false, 404, "No news found"));
    }

    // Calculate pagination details
    const pagination = paginate(
      total,
      posts.length,
      page,
      limit,
      POSTS_URL + "/search?q=" + q
    );

    if (pagination.error) {
      return res
        .status(pagination.status)
        .json(createResponse(false, pagination.status, pagination.message));
    }

    // Return the results
    return res
      .status(200)
      .json(
        createResponse(true, 200, "News search results", { pagination, posts })
      );
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(createResponse(false, 500, "Internal server error"));
  }
};

/**
 * Fetches related posts based on the category of the given post.
 * @param {Object} req - The Express request object containing the post ID.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getRecommendedNews = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return res.status(404).json(createResponse(false, 404, "Post not found"));
    }

    const relatedPosts = await prisma.post.findMany({
      where: {
        id: { not: postId },
        categoryId: post.categoryId,
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    });

    return res
      .status(200)
      .json(
        createResponse(
          true,
          200,
          "Related posts fetched successfully",
          relatedPosts
        )
      );
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(createResponse(false, 500, "Internal server error"));
  }
};

/**
 * Fetches a post by its slug and increments visit count.
 * @param {Object} req - The Express request object containing the post slug in params.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { visitCount: { increment: 1 } },
      include: {
        category: true,
      },
    });

    if (!post) {
      return res.status(404).json(createResponse(false, 404, "Post not found"));
    }

    return res
      .status(200)
      .json(createResponse(true, 200, "Post fetched successfully", post));
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(createResponse(false, 500, "Internal server error"));
  }
};

/**
 * Fetches popular news posts based on visit count with pagination.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getPopularNews = async (req, res) => {
  let {
    page = 1,
    limit = 6,
    sortBy = "visitCount",
    order = "desc",
  } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  try {
    const total = await prisma.post.count({
    });

    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
    });

    const pagination = paginate(
      total,
      posts.length,
      page,
      limit,
      POSTS_URL + "/popular"
    );

    if (pagination.error) {
      return res
        .status(pagination.status)
        .json(createResponse(false, pagination.status, pagination.message));
    }

    return res.status(200).json(
      createResponse(true, 200, "Popular posts fetched successfully", {
        pagination,
        posts,
      })
    );
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(createResponse(false, 500, "Internal server error"));
  }
};

/** Admin routes */

/**
 * Fetches all posts with pagination and sorting.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getAllPosts = async (req, res) => {
  let { page = 1, limit = 9, sortBy = "createdAt", order = "desc" } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  try {
    const total = await prisma.post.count(); // Get the total count of posts
    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            name: true,
            nepaliName: true,
          },
        },
      },
    });

    // Now call the paginate function to get pagination metadata
    const pagination = paginate(total, posts.length, page, limit, ADMIN_URL);

    if (pagination.error) {
      return res
        .status(pagination.status)
        .json(createResponse(false, pagination.status, pagination.message));
    }

    return res.status(200).json(
      createResponse(true, 200, "All posts fetched successfully", {
        pagination,
        posts,
      })
    );
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(createResponse(false, 500, "Internal server error"));
  }
};


/**
 * Fetches a post by its ID.
 * @param {Object} req - The Express request object containing the post ID in params.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        category: {
          select: {
            name: true,
            nepaliName: true,
          },
        },
        sentiment: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!post) {
      return res.status(404).json(createResponse(false, 404, "Post not found"));
    }

    return res
      .status(200)
      .json(createResponse(true, 200, "Post fetched successfully", post));
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(createResponse(false, 500, "Internal server error"));
  }
};

/**
 * Creates a new post with image upload.
 * @param {Object} req - The Express request object containing the post data in body and image in file.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const createPost = async (req, res) => {
  // Use the uploadSingle middleware to handle image upload
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, message: err.message || "File upload error" });
    }

    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json(createResponse(false, 400, "Image is required"));
    }

    try {
      // Upload image to Cloudinary
      cloudinary.v2.config({
        cloud_name: CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
        secure: true,
      });
      
      const result = await cloudinary.v2.uploader.upload_stream(
        {
          folder: "news_images", // Set a folder in Cloudinary to store images
          resource_type: "image", // Ensures only images are uploaded
        },
        async (error, result) => {
          if (error) {
            return res.status(500).json(createResponse(false, 500, "Cloudinary upload failed"));
          }

          // Cloudinary returns a result with secure_url (URL of the uploaded image)
          const imageUrl = result.secure_url;

          // call the algorithm endpoint to get the category label
          const categoryResponse = await fetch(`${NEWS_ALGORITHM_API_URL}/classify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: description })
          });

          // call the algorithm endpoint to get the sentiment
          const sentimentResponse = await fetch(`${NEWS_ALGORITHM_API_URL}/analyze-sentiment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: description })
          });

          // call the summary endpoint to get the summary
          const summaryResponse = await fetch(`${NEWS_ALGORITHM_API_URL}/summarize`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: description })
          });

          // Category data
          const categoryData = await categoryResponse.json();
          console.log(`Classified category: ${categoryData.data.category} and label: ${categoryData.data.label}`);

          // Sentiment data
          const sentimentData = await sentimentResponse.json();
          console.log(`Sentiment: ${sentimentData.data.sentiment} and probability: ${sentimentData.data.probability}`);

          // connect sentiment with the database id
          const sentiment = await prisma.sentiment.findUnique({
            where: { name: sentimentData.data.sentiment.toUpperCase() },
          });

          const summaryData = await summaryResponse.json();
          // console.log(`Summary: ${summaryData.data.summary}`);

          // find the category by label
          const category = await prisma.category.findUnique({
            where: { id: categoryData.data.label },
          });

          // Create post in the database
          const post = await prisma.post.create({
            data: {
              title,
              description,
              image: imageUrl, // Store the Cloudinary image URL
              category: {
                connect: { id: category.id },
              },
              sentiment: {
                connect: { id: sentiment.id },
              },
              summary: summaryData.data.summary,
              slug: title.toLowerCase().replace(/ /g, "-"),
              user: {
                connect: { id: req.userId },
              }
            },
          });

          return res.status(201).json(createResponse(
            true,
            201,
            "Post created successfully",
            post
          ));
        }
      );

      result.end(req.file.buffer); // Pass the image buffer to the upload stream
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json(createResponse(false, 500, "Internal server error"));
    }
  });
};

/**
 * Updates a post by its ID.
 * @param {Object} req - The Express request object containing the post ID in params and updated data in body.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const updatePostById = async (req, res) => {
  const { postId } = req.params;
  const data = req.body;

  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        ...data,
      },
    });

    return res
      .status(200)
      .json(createResponse(true, 200, "Post updated successfully", post));
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(createResponse(false, 500, "Internal server error"));
  }
};

/**
 * Deletes a post by its ID.
 * @param {Object} req - The Express request object containing the post ID in params.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const deletePostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json(createResponse(false, 404, "Post not found"));
    }

    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    return res
      .status(204)
      .json(
        createResponse(true, 204, "Post deleted successfully", deletedPost)
      );
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(createResponse(false, 500, "Internal server error"));
  }
};
