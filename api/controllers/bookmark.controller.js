import { config } from "../config/index.js";
import prisma from "../config/prisma.js";
import { paginate } from "../utils/pagination.js";
import { createResponse } from "../utils/responseModel.js";

const BOOKMARKS_URL = config.server.apiURL + "/bookmarks";

/**
 * Creates a bookmark for a specific post by a logged-in user.
 * @param {Object} req - Express request object, expects `user.id` and `postId`.
 * @param {Object} res - Express response object to send back the response.
 * @returns {void}
 */
export const createBookmark = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId;

    try {
        // Check if the post exists
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) {
            return res.status(404).json(createResponse(false, 404, "Post not found"));
        }

        // Check if the bookmark already exists
        const existingBookmark = await prisma.bookmark.findUnique({
            where: { userId_postId: { userId, postId } },
        });
        if (existingBookmark) {
            return res.status(409).json(createResponse(false, 409, "Bookmark already exists"));
        }

        // Create a new bookmark
        const bookmark = await prisma.bookmark.create({
            data: {
                userId,
                postId,
            },
        });

        return res.status(201).json(createResponse(
            true,
            201,
            "Bookmark created successfully",
            bookmark
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(false, 500, "Internal server error"));
    }
};

/**
 * Deletes a bookmark by the logged-in user for a specific post.
 * @param {Object} req - Express request object, expects `user.id` and `postId`.
 * @param {Object} res - Express response object to send back the response.
 * @returns {void}
 */
export const deleteBookmark = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId;

    try {
        // Find and delete the bookmark
        const deletedBookmark = await prisma.bookmark.deleteMany({
            where: {
                userId,
                postId,
            },
        });

        if (deletedBookmark.count === 0) {
            return res.status(404).json(createResponse(false, 404, "Bookmark not found"));
        }

        return res.status(200).json(createResponse(
            true,
            200,
            "Bookmark deleted successfully"
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(false, 500, "Internal server error"));
    }
};

/**
 * Fetches all bookmarks of a user with pagination.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object to send back the response.
 */
export const getUserBookmarks = async (req, res) => {
    const userId = req.userId;
    let {
        page = 1,
        limit = 9,
        sortBy = "createdAt",
        order = "desc"
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    try {
        const total = await prisma.bookmark.count({
            where: { userId }
        });

        // Fetch the paginated bookmarks
        const bookmarks = await prisma.bookmark.findMany({
            where: { userId: userId },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                [sortBy]: order,
            },

            select: {
                id: true,
                post: {
                    select: {
                        id: true,
                        title: true,
                        image: true,
                        description: true,
                        createdAt: true,
                        visitCount: true,
                        slug: true,
                        _count: {
                            select: {
                                comments: true
                            },
                        }
                    }
                },
                createdAt: true,
            }
        });

        const pagination = paginate(
            total,
            bookmarks.length,
            page,
            limit,
            BOOKMARKS_URL
        )


        res.status(200).json(createResponse(
            true,
            200,
            "Bookmarks fetched successfully.",
            { pagination, bookmarks }
        ));
    } catch (error) {
        res.status(500).json(createResponse(
            false,
            500,
            error.message
        ));
    }
};

/**
 * Checks if a post is bookmarked by the logged-in user.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object to send back the response.
 */
export const isBookmarked = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId) {
        return res.status(400).json(createResponse(
            false,
            400,
            "Post ID is required."
        ));
    }

    try {
        const bookmark = await prisma.bookmark.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        });

        res.status(200).json(createResponse(
            true,
            200,
            "Bookmark status fetched successfully.",
            { isBookmarked: !!bookmark }
        ));
    } catch (error) {
        res.status(500).json(createResponse(
            false,
            500,
            error.message
        ));
    }
};