import { createResponse } from "../utils/responseModel.js";
import {
    sendWelcomeEmail,
    sendResetSuccessEmail
} from "../mail/nodemailer/emails.js";
import bcryptjs from "bcryptjs";

import prisma from "../config/prisma.js";
import { paginate } from "../utils/pagination.js";
import { config } from "../config/index.js";

const USER_URL = config.server.apiURL + "/users";
const ADMIN_URL = USER_URL + "/admin";

/**  User Specific Controller **/

export const getUserDetails = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            include: { role: true },

        });

        if (!user) {
            return res.status(400).json(createResponse(
                false,
                400,
                "User not found"
            ));
        }

        const returnUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            role: { name: user.role.name }, 
            isVerified: user.isVerified,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        res.status(200).json(createResponse(
            true,
            200,
            "User details fetched successfully",
            { ...returnUser }
        ));
    } catch (error) {
        console.error("Error in getUserDetails", error);
        res.status(500).json(createResponse(false, 500, error.message));
    }
};

export const updateUserDetails = async (req, res) => {
    const { name, phone } = req.body;

    try {
        const dataToUpdate = {};
        if (name) dataToUpdate.name = name;
        if (phone) dataToUpdate.phone = phone;

        const user = await prisma.user.update({
            where: { id: req.userId },
            data: dataToUpdate,
            include: { role: true },
        });

        const returnUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            role: user.role.name,
            isVerified: user.isVerified,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        res.status(200).json(createResponse(
            true,
            200,
            `User ${user.id} updated successfully`,
            { ...returnUser }
        ));
    } catch (error) {
        console.error("Error in updateUserDetails", error);
        res.status(500).json(createResponse(false, 500, error.message));
    }
};

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { id: req.userId } });

        if (!user) {
            return res.status(400).json(createResponse(false, 400, "User not found"));
        }

        const isOldPasswordValid = await bcryptjs.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            return res.status(400).json(createResponse(false, 400, "Old password is incorrect"));
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: req.userId },
            data: { password: hashedPassword },
        });

        await sendResetSuccessEmail(user.email);

        res.status(200).json(createResponse(true, 200, "Password updated successfully"));
    } catch (error) {
        console.error("Error in changePassword", error);
        res.status(500).json(createResponse(false, 500, error.message));
    }
};

export const deleteSelf = async (req, res) => {
    try {
        await prisma.user.delete({ where: { id: req.userId } });

        res.clearCookie("token");
        res.status(200).json(createResponse(true, 200, "User deleted successfully"));
    } catch (error) {
        console.error("Error in deleteSelf", error);
        res.status(500).json(createResponse(false, 500, error.message));
    }
};

/** Admin Controller **/

/**
 * Get all users with pagination and sorting
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
export const getAllUsers = async (req, res) => {
    const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "desc",
    } = req.query;

    try {
        // Fetch total number of users for pagination metadata
        const total = await prisma.user.count();  // Get the total count of users
        const users = await prisma.user.findMany({
            skip: (page - 1) * limit,  // Skip items for pagination
            take: limit,               // Limit the number of items per page
            orderBy: {
                [sortBy]: order,       // Sorting based on query params
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: { select: { name: true } },
                isVerified: true,
                lastLogin: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        // Now call the paginate function to get pagination metadata
        const pagination = paginate(total, users.length, page, limit, ADMIN_URL);

        if (pagination.error) {
            return res.status(pagination.status).json(createResponse(false, pagination.status, pagination.message));
        }

        res.status(200).json(createResponse(true, 200, "Users fetched successfully", {
            pagination: pagination,
            users: users,
        }));
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json(createResponse(false, 500, error.message));
    }
};


export const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { 
                id: true,
                email: true,
                name: true,
                phone: true,
                role: { select: { name: true } },
                isVerified: true,
                lastLogin: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            return res.status(400).json(createResponse(false, 400, "User not found"));
        }

        res.status(200).json(createResponse(true, 200, "User fetched successfully", user));
    } catch (error) {
        console.error("Error in getUserById", error);
        res.status(500).json(createResponse(false, 500, error.message));
    }
};

export const updateUserRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    try {
        if (!["USER", "ADMIN"].includes(role)) {
            return res.status(400).json(createResponse(false, 400, "Invalid role"));
        }

        const roleRecord = await prisma.role.findUnique({
            where: { name: role },
        });

        if (!roleRecord) {
            return res.status(400).json(createResponse(false, 400, "Role does not exist"));
        }

        // check if the user exists
        const userExists = await prisma.user.findUnique({ where: { id: userId } });

        if (!userExists) {
            return res.status(400).json(createResponse(false, 400, "User not found"));
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { roleId: roleRecord.id },
        });

        const return_user = {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            role: { name: role },
            isVerified: user.isVerified,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        res.status(200).json(createResponse(
            true,
            200,
            "User role updated",
            { ...return_user }
        ));
    } catch (error) {
        console.error("Error in updateUserRole", error);
        res.status(500).json(createResponse(false, 500, error.message));
    }
};

export const updateUserDetailsByAdmin = async (req, res) => {
    const { userId } = req.params;
    const { email, name, phone, password } = req.body;

    try {
        const dataToUpdate = {};
        if (email) dataToUpdate.email = email;
        if (name) dataToUpdate.name = name;
        if (phone) dataToUpdate.phone = phone;
        if (password) {
            const hashedPassword = await bcryptjs.hash(password, 10);
            dataToUpdate.password = hashedPassword;
        }

        const existingUser = await prisma.user.findUnique({ where: { id: userId } });

        if (!existingUser) {
            return res.status(400).json(createResponse(false, 400, "User not found"));
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: dataToUpdate,
            include: { role: true },
        });

        const returnUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            role: { name: user.role.name },
            isVerified: user.isVerified,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        res.status(200).json(createResponse(
            true,
            200,
            `User ${user.id} updated successfully`,
            { ...returnUser }
        ));
    } catch (error) {
        console.error("Error in updateUserDetailsByAdmin", error);
        res.status(500).json(createResponse(false, 500, error.message));
    }
};


export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // check if the user exists
        const userExists = await prisma.user.findUnique({ where: { id: userId } });

        if (!userExists) {
            return res.status(400).json(createResponse(false, 400, "User not found"));
        }

        await prisma.user.delete({ where: { id: userId } });

        res.status(200).json(createResponse(true, 200, "User deleted successfully"));
    } catch (error) {
        console.error("Error in deleteUser", error);
        res.status(500).json(createResponse(false, 500, error.message));
    }
};

export const approveUserEmail = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(400).json(createResponse(false, 400, "User not found"));
        }

        if (user.isVerified) {
            return res.status(400).json(createResponse(false, 400, "User is already verified"));
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiresAt: null,
            },
        });

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json(createResponse(true, 200, "User's email has been verified", updatedUser));
    } catch (error) {
        console.error("Error in approveUserEmail", error);
        res.status(500).json(createResponse(false, 500, error.message));
    }
};

export const suspendUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { isSuspended: true },
        });

        res.status(200).json(createResponse(true, 200, "User suspended successfully"));
    } catch (error) {
        console.error("Error in suspendUser", error);
        res.status(500).json(createResponse(false, 500, error.message));
    }
};
