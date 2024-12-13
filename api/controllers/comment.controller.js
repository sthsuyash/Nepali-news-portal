import prisma from "../config/prisma.js";
import { createResponse } from "../utils/responseModel.js";
import { paginate } from "../utils/pagination.js";
import { config } from "../config/index.js";

const COMMENTS_URL = config.server.apiURL + "/comments";

/** Public routes */

/**
 * Fetches all comments for a specific post with pagination.
 * @param {Object} req - The Express request object containing post ID in params.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getCommentsByPost = async (req, res) => {
    const { postId } = req.params;
    let {
        page = 1,
        limit = 9,
        sortBy = "updatedAt",
        order = "desc",
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    try {
        const post = await prisma.post.findUnique({ where: { id: postId } });

        if (!post) {
            return res.status(404).json(createResponse(false, 404, "Post not found"));
        }

        const total = await prisma.comment.count({
            where: {
                postId: postId,
            }
        });

        const comments = await prisma.comment.findMany({
            where: { postId },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                [sortBy]: order,
            },

            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                }
            },
        });

        const pagination = paginate(
            total,
            comments.length,
            page,
            limit,
            `${COMMENTS_URL}/${postId}`
        );

        return res.status(200).json(createResponse(
            true,
            200,
            "Comments fetched successfully",
            { pagination, comments }
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(
            false,
            500,
            "Internal server error"
        ));
    }
};

/** Authenticated routes */

/**
 * Creates a new comment for a post.
 * @param {Object} req - The Express request object containing comment details in body.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const createComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    const userId = req.userId;

    if (!content || !postId) {
        return res.status(400).json(createResponse(
            false,
            400,
            "Content and postId are required"
        ));
    }

    try {
        // check if the post exists
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) {
            return res.status(404).json(createResponse(
                false,
                404,
                "Post not found"
            ));
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                userId,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        });

        return res.status(201).json(createResponse(
            true,
            201,
            "Comment created successfully",
            comment
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(
            false,
            500,
            "Internal server error"
        ));
    }
};

/**
 * Updates a comment by its ID if it belongs to the user.
 * @param {Object} req - The Express request object containing comment ID in params and updated data in body.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const updateCommentById = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    const userId = req.userId;

    if (!content) {
        return res.status(400).json(createResponse(
            false,
            400,
            "Content is required to update the comment"
        ));
    }

    try {
        // Verify that the comment belongs to the user
        const existingComment = await prisma.comment.findUnique({ where: { id: commentId } });
        if (!existingComment) {
            return res.status(404).json(createResponse(
                false,
                404,
                "Comment not found"
            ));
        }

        if (existingComment.userId !== userId) {
            return res.status(403).json(createResponse(
                false,
                403,
                "You can only update your own comment"
            ));
        }

        const comment = await prisma.comment.update({
            where: { id: commentId },
            data: { content },
            select: {
                id: true,
                content: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
            }
        });

        return res.status(200).json(createResponse(
            true,
            200,
            "Comment updated successfully",
            comment
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(
            false,
            500,
            "Internal server error"
        ));
    }
};

/**
 * Deletes a comment by its ID.
 * @param {Object} req - The Express request object containing comment ID in params.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const deleteCommentById = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.userId;
    const isAdmin = req.userRole === "ADMIN"; // Check if the user is an admin.

    try {
        // Verify that the comment exists
        const existingComment = await prisma.comment.findUnique({ where: { id: commentId } });
        if (!existingComment) {
            return res.status(404).json(createResponse(false, 404, "Comment not found"));
        }

        // Check if the user owns the comment or is an admin
        if (existingComment.userId !== userId && !isAdmin) {
            return res.status(403).json(createResponse(
                false,
                403,
                "You are not authorized to delete this comment"
            ));
        }

        await prisma.comment.delete({ where: { id: commentId } });

        return res.status(204).json(createResponse(
            true,
            204,
            "Comment deleted successfully"
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(false, 500, "Internal server error"));
    }
};

/** Admin specific routes */

/**
 * Fetches all comments with pagination and sorting (Admin only).
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getAllComments = async (req, res) => {
    let { page = 1, limit = 10, sortBy = "updatedAt", order = "desc" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    try {
        const total = await prisma.comment.count();
        const comments = await prisma.comment.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                [sortBy]: order,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                post: {
                    select: {
                        id: true, title: true, slug: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: {
                            select: {
                                name: true
                            }
                        },
                    }
                }
            }
        });

        const pagination = paginate(total, comments.length, page, limit, COMMENTS_URL);

        return res.status(200).json(createResponse(
            true,
            200,
            "All comments fetched successfully",
            { pagination, comments }
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(false, 500, "Internal server error"));
    }
};

/**
 * Fetches a comment by its ID (Admin only).
 * @param {Object} req - The Express request object containing comment ID in params.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getCommentById = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                post: {
                    select: {
                        id: true, title: true, slug: true
                    }
                },
                user: {
                    select: {
                        id: true, name: true, email: true,
                        role: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!comment) {
            return res.status(404).json(createResponse(false, 404, "Comment not found"));
        }

        return res.status(200).json(createResponse(
            true,
            200,
            "Comment fetched successfully",
            comment
        ));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(createResponse(false, 500, "Internal server error"));
    }
}
