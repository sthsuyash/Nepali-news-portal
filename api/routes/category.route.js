import express from "express";
import {
    getCategoryList,
    getTopPostsByCategory,
    getPostsByCategory,

    getCategoryListForAdmin,
    createCategory,
    getCategoryById,
    editCategory,
    deleteCategory
} from "../controllers/category.controller.js";
import { isAdmin, verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Admin dashboard routes
router.get("/admin", verifyToken, isAdmin, getCategoryListForAdmin); // Paginated list of categories
router.post("/admin", verifyToken, isAdmin, createCategory);
router.get("/admin/:id", verifyToken, isAdmin, getCategoryById);
router.put("/admin/:id", verifyToken, isAdmin, editCategory);
router.delete("/admin/:id", verifyToken, isAdmin, deleteCategory);

// Public routes
router.get("/", getCategoryList); // Fetch all categories
router.get("/:categoryName/top", getTopPostsByCategory); // Fetch top posts by category
router.get("/:categoryName", getPostsByCategory); // Fetch posts by category

export default router;
