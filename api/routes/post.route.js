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
import multer from "multer";
// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Add timestamp to avoid file name conflicts
  },
});
const upload = multer({ storage });

// Configure rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const router = express.Router();

// Admin routes
router.get("/admin", verifyToken, isAdmin, getAllPosts);
router.post("/admin", limiter, verifyToken, isAdmin, upload.single("image"), createPost);
router.get("/admin/:postId", verifyToken, isAdmin, getPostById);
router.put("/admin/:postId", verifyToken, isAdmin, updatePostById);
router.delete("/admin/:postId", verifyToken, isAdmin, deletePostById);

// Public routes
router.get("/recent", getRecentPosts); // Fetch recent posts
router.get("/search", searchNews); // Search news by query
router.get("/popular", getPopularNews); // Fetch popular news
router.get("/:slug", getPostBySlug); // Fetch a single post by slug (updated to use getNews)
router.get("/recommended/:postId", getRecommendedNews); // Fetch related posts by postId

export default router;
