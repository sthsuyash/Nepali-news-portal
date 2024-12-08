import express from "express";
import {
    getCategoryList,
    getTopPostsByCategory,
    getPostsByCategory,
    
    getCategoryListForAdmin,
    createCategory, 
    editCategory,
    deleteCategory
} from "../controllers/category.controller.js";

const router = express.Router();

// Public routes
router.get("/", getCategoryList); // Fetch all categories
router.get("/:categoryName/top", getTopPostsByCategory); // Fetch top posts by category
router.get("/:categoryName", getPostsByCategory); // Fetch posts by category

// Admin dashboard routes
router.get("/admin", getCategoryListForAdmin); // Paginated list of categories
router.post("/admin", createCategory); // Paginated list of categories
router.put("/admin/:id", editCategory); // Paginated list of categories
router.delete("/admin/:id", deleteCategory); // Paginated list of categories

export default router;