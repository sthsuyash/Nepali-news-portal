import { createResponse } from "../utils/responseModel.js";
import prisma from "../config/prisma.js";

export const getDashboard = async (req, res) => {
    try {
        // Fetch all counts in parallel
        const [
            totalUsers,
            totalPosts,
            totalComments,
            totalCategories,
            positiveSentimentNews,
            negativeSentimentNews,
            neutralSentimentNews,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.post.count(),
            prisma.comment.count(),
            prisma.category.count(),
            prisma.post.count({ where: { sentiment: { name: "POSITIVE" } } }),
            prisma.post.count({ where: { sentiment: { name: "NEGATIVE" } } }),
            prisma.post.count({ where: { sentiment: { name: "NEUTRAL" } } }),
        ]);

        return res.status(200).json(
            createResponse(true, 200, "Dashboard data fetched successfully", {
                totalUsers,
                totalPosts,
                totalComments,
                totalCategories,
                positiveSentimentNews,
                negativeSentimentNews,
                neutralSentimentNews,
            })
        );
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return res.status(500).json(createResponse(false, 500, "Internal server error", null));
    }
};
