import express from "express";
import {
    getAllPosts,
    getRecentPosts,
    searchNews,
    getPopularNews,
    getPostBySlug,
    getRecommendedNews,
} from "../controllers/post.controller.js";
import { isAdmin, verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public routes
router.get("/recent", getRecentPosts); // Fetch recent posts
router.get("/search", searchNews); // Search news by query
router.get("/popular", getPopularNews); // Fetch popular news
router.get("/:slug", getPostBySlug); // Fetch a single post by slug (updated to use getNews)
router.get("/recommended/:postId", getRecommendedNews); // Fetch related posts by postId

// Admin routes
router.get("/admin", verifyToken, isAdmin, getAllPosts);

// Commented out routes (to be implemented later)
// router.post("/", createPost);
// router.delete("/:id", deletePost);
// router.patch("/feature", featurePost);

export default router;
