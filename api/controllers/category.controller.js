import prisma from "../config/prisma.js";
import { createResponse } from "../utils/responseModel.js";
import { config } from "../config/index.js";
import { paginate } from "../utils/pagination.js";

const CATEGORY_URL = config.server.apiURL + "/category";
const ADMIN_URL = CATEGORY_URL + "/admin";

/**
 * Fetches all posts with pagination.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const getCategoryList = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        posts: true
                    }
                }
            }
        });

        res.status(200).json(createResponse(
            true,
            200,
            "Categories fetched successfully.",
            categories
        ));
    } catch (error) {
        res.status(500).json(createResponse(
            false,
            500,
            error.message
        ));
    }
};


export const getTopPostsByCategory = async (req, res) => {
    const { categoryName } = req.params;
    let {
        page = 1,
        limit = 4,
        orderBy = "createdAt",
        order = "desc"
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    try {
        const categoryNews = await prisma.category.findUnique({
            where: {
                name: categoryName
            },
            include: {
                posts: {
                    orderBy: {
                        [orderBy]: order
                    },
                    take: limit,
                    skip: (page - 1) * limit
                }
            }
        });

        res.status(200).json(createResponse(
            true,
            200,
            "Top posts fetched successfully.",
            categoryNews
        ));
    } catch (error) {
        res.status(500).json(createResponse(null, error.message));
    }
}

export const getPostsByCategory = async (req, res) => {
    const { categoryName } = req.params;
    const {
        page = 1,
        limit = 10,
        orderBy = "createdAt",
        order = "desc"
    } = req.query;

    try {
        const categoryNews = await prisma.category.findUnique({
            where: {
                name: categoryName
            },
            include: {
                posts: {
                    orderBy: {
                        [orderBy]: order
                    },
                    take: limit,
                    skip: (page - 1) * limit
                }
            }
        });

        res.status(200).json(createResponse(
            true,
            200,
            "Posts fetched successfully.",
            categoryNews
        ));
    } catch (error) {
        res.status(500).json(createResponse(null, error.message));
    }

}


/** Admin dashboard routes */
export const getCategoryListForAdmin = async (req, res) => {
    const {
        page = 1,
        limit = 10,
        sortBy = "name",
        order = "asc"
    } = req.query;

    try {
        const total = await prisma.category.count();
        const categories = await prisma.category.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                [sortBy]: order
            },
        });

        const pagination = paginate(total, categories.length, page, limit, ADMIN_URL);
        if (pagination.error) {
            return res.status(400).json(createResponse(null, pagination.error));
        }

        res.status(200).json(createResponse(
            true,
            200,
            "Categories fetched successfully.",
            {
                pagination: pagination,
                categories: categories
            }
        ));
    }
    catch (error) {
        res.status(500).json(createResponse(null, error.message));
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, nepaliName } = req.body;

        // check if category already exists
        const existingCategory = await prisma.category.findUnique({
            where: {
                name
            }
        });

        if (existingCategory) {
            return res.status(400).json(createResponse(null, "Category already exists."));
        }

        const category = await prisma.category.create({
            data: {
                name,
                nepaliName
            }
        });

        res.status(201).json(createResponse(
            true,
            201,
            "Category created successfully.",
            category
        ));
    } catch (error) {
        res.status(500).json(createResponse(
            false,
            500,
            error.message
        ));

    }
}

export const editCategory = async (req, res) => {
    const { id } = req.params;
    const { name, nepaliName } = req.body;

    const dataToUpdate = {};
    if (name) { data.name = name; }
    if (nepaliName) { data.nepaliName = nepaliName; }

    try {
        const category = await prisma.category.update({
            where: {
                id: parseInt(id)
            },
            data: dataToUpdate
        });

        res.status(200).json(createResponse(
            true,
            200,
            "Category updated successfully.",
            category
        ));
    } catch (error) {
        res.status(500).json(createResponse(
            false,
            500,
            error.message
        ));
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.category.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.status(200).json(createResponse(
            true,
            200,
            "Category deleted successfully."
        ));
    } catch (error) {
        res.status(500).json(createResponse(
            false,
            500,
            error.message
        ));
    }
}