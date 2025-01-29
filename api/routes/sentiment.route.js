import express from 'express';
import { getSentimentList } from '../controllers/sentiment.controller.js';
import { isAdmin, verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/admin', verifyToken, isAdmin, getSentimentList);

export default router;