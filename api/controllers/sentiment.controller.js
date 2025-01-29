import prisma from "../config/prisma.js";
import { createResponse } from "../utils/responseModel.js";

export const getSentimentList = async (req, res) => {
    try {
        const sentiments = await prisma.sentiment.findMany();

        res.status(200).json(createResponse(
            true,
            200,
            "Sentiments fetched successfully.",
            sentiments
        ));
    } catch (error) {
        res.status(500).json(createResponse(
            false,
            500,
            error.message
        ));
    }
};