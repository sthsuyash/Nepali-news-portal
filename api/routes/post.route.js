import express from "express";
import rateLimit from "express-rate-limit";
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
  getRecentPosts,
  searchNews,
  getPopularNews,
  getPostBySlug,
  getRecommendedNews,
} from "../controllers/post.controller.js";
import { isAdmin, verifyToken } from "../middleware/verifyToken.js";

// Configure rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per windowMs
});

const router = express.Router();

// Admin routes
router.get("/admin", limiter, verifyToken, isAdmin, getAllPosts);
router.post("/admin", limiter, verifyToken, isAdmin, createPost);
router.get("/admin/:postId", limiter, verifyToken, isAdmin, getPostById);
router.put("/admin/:postId", limiter, verifyToken, isAdmin, updatePostById);
router.delete("/admin/:postId", limiter, verifyToken, isAdmin, deletePostById);

// Public routes
router.get("/recent", getRecentPosts); // Fetch recent posts
router.get("/search", searchNews); // Search news by query
router.get("/popular", getPopularNews); // Fetch popular news
router.get("/:slug", getPostBySlug); // Fetch a single post by slug (updated to use getNews)
router.get("/recommended/:postId", getRecommendedNews); // Fetch related posts by postId

export default router;
