import express from "express";
import {
    createBookmark,
    deleteBookmark,
    getUserBookmarks,
} from "../controllers/bookmark.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getUserBookmarks);
router.post("/:postId", verifyToken, createBookmark);
router.delete("/:postId", verifyToken, deleteBookmark);

export default router;
