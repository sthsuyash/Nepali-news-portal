import express from "express";

import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import postRoutes from './post.route.js';
import categoryRoutes from './category.route.js';
import commentRoutes from './comment.route.js';
import bookmarkRoutes from './bookmarks.route.js';
import sentimentRoutes from './sentiment.route.js';
import dashboardRoutes from './dashboard.route.js';

import { isAdmin, verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', verifyToken, userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/category', categoryRoutes);
router.use('/bookmarks', verifyToken, bookmarkRoutes);
router.use('/sentiments', verifyToken, sentimentRoutes);
router.use('/admin/dashboard', verifyToken, isAdmin, dashboardRoutes);

export default router;
