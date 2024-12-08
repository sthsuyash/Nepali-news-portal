import prisma from "../config/prisma.js";
import { createResponse } from "../utils/responseModel.js";
import { paginate } from "../utils/pagination.js";
import { config } from "../config/index.js";

const POSTS_URL = config.server.apiURL + "/posts";

/**
 * Fetches the most recent active news posts with pagination.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getRecentPosts = async (req, res) => {
    let {
        page = 1,
        limit = 6,
        sortBy = "createdAt",
        order = "desc"
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    try {
        const total = await prisma.post.count({ where: { status: 'PUBLISHED' } });
        const posts = await prisma.post.findMany({
            where: { status: 'PUBLISHED' },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                [sortBy]: order,
            },
        });

        const pagination = paginate(total, posts.length, page, limit, POSTS_URL + "/recent");

        if (pagination.error) {
            return res.status(pagination.status).json(createResponse(false, pagination.status, pagination.message));
        }

        return res.status(200).json(createResponse(
            true,
            200,
            "Recent posts fetched successfully",
            { pagination, posts }
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(false, 500, "Internal server error"));
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
        limit = 10,
        sortBy = "createdAt",
        order = "desc"
    } = req.query;

    // Ensure page and limit are integers and apply a maximum limit
    page = parseInt(page);
    limit = Math.min(parseInt(limit), 10); // Limit the number of items per request to 100

    // Validate the search term `q`
    if (!q || q.trim().length === 0) {
        return res.status(400).json(createResponse(false, 400, "Search value is required"));
    }

    // Validate sortBy to ensure it's a valid field
    const validSortFields = ['createdAt', 'title', 'description']; // Add more if necessary
    if (!validSortFields.includes(sortBy)) {
        return res.status(400).json(createResponse(false, 400, "Invalid sort field"));
    }

    try {
        // Count total number of posts matching the search query
        const total = await prisma.post.count({
            where: {
                status: 'PUBLISHED',
                OR: [
                    { title: { contains: q, mode: 'insensitive' } },
                    { description: { contains: q, mode: 'insensitive' } },
                ]
            }
        });

        // Fetch posts matching the search query with pagination and sorting
        const posts = await prisma.post.findMany({
            where: {
                status: 'PUBLISHED',
                OR: [
                    { title: { contains: q, mode: 'insensitive' } },
                    { description: { contains: q, mode: 'insensitive' } },
                ]
            },
            skip: (page - 1) * limit,  // Skip the posts based on current page
            take: limit,               // Limit the number of posts returned
            orderBy: {
                [sortBy]: order,        // Order by the selected field (createdAt, title, description)
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
        const pagination = paginate(total, posts.length, page, limit, POSTS_URL + "/search?q=" + q);

        if (pagination.error) {
            return res.status(pagination.status).json(createResponse(false, pagination.status, pagination.message));
        }

        // Return the results
        return res.status(200).json(createResponse(
            true,
            200,
            "News search results",
            { pagination, posts }
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(false, 500, "Internal server error"));
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
                status: 'PUBLISHED'
            },
            take: 4,
            orderBy: { createdAt: 'desc' }
        });

        return res.status(200).json(createResponse(
            true,
            200,
            "Related posts fetched successfully",
            relatedPosts
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(false, 500, "Internal server error"));
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
            }
        });

        if (!post) {
            return res.status(404).json(createResponse(false, 404, "Post not found"));
        }

        return res.status(200).json(createResponse(
            true,
            200,
            "Post fetched successfully",
            post
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(false, 500, "Internal server error"));
    }
};

/**
 * Fetches popular news posts based on visit count with pagination.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getPopularNews = async (req, res) => {
    const { page = 1, limit = 6, sortBy = "visitCount", order = "desc" } = req.query;

    try {
        const total = await prisma.post.count({
            where: {
                status: 'PUBLISHED',
            }
        });
            
        const posts = await prisma.post.findMany({
            where: { status: 'PUBLISHED' },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                [sortBy]: order,
            },
        });

        const pagination = paginate(total, posts.length, page, limit, POSTS_URL + "/popular");

        if (pagination.error) {
            return res.status(pagination.status).json(createResponse(false, pagination.status, pagination.message));
        }

        return res.status(200).json(createResponse(
            true,
            200,
            "Popular posts fetched successfully",
            { pagination, posts }
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(false, 500, "Internal server error"));
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
    const { page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = req.query;

    try {
        const total = await prisma.post.count();  // Get the total count of posts
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
                status: true,
            },
        });

        // Now call the paginate function to get pagination metadata
        const pagination = paginate(total, posts.length, page, limit, POSTS_URL);

        if (pagination.error) {
            return res.status(pagination.status).json(createResponse(false, pagination.status, pagination.message));
        }

        return res.status(200).json(createResponse(
            true,
            200,
            "All posts fetched successfully",
            { pagination, posts }
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(false, 500, "Internal server error"));
    }
};

