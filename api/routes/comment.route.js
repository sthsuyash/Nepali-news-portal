import express from "express";
import {
    getCommentsByPost,
    createComment,
    updateCommentById,
    deleteCommentById,
    getAllComments,
    getCommentById,
} from "../controllers/comment.controller.js";
import { verifyToken, isAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

// Admin-only routes (specific first to avoid conflicts)
router.get("/admin", verifyToken, isAdmin, getAllComments); // Fetch all comments with pagination
router.get("/admin/:commentId", verifyToken, isAdmin, getCommentById); // Fetch a specific comment by ID

// Public route (less specific)
router.get("/:postId", getCommentsByPost); // Fetch comments for a specific post with pagination

// Authenticated user routes
router.post("/:postId", verifyToken, createComment); // Create a comment on a post
router.put("/:commentId", verifyToken, updateCommentById); // Update user's own comment
router.delete("/:commentId", verifyToken, deleteCommentById); // Delete user's own comment or admin deletes any comment

export default router;
