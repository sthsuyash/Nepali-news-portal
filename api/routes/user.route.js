import express from "express";

import { isAdmin } from "../middleware/verifyToken.js";
import { validatePassword } from "../middleware/validatePassword.js";

import {
    getUserDetails,
    updateUserDetails,
    changePassword,
    deleteSelf,

    getAllUsers,
    getUserById,
    updateUserRole,
    updateUserDetailsByAdmin,
    deleteUser,

    approveUserEmail,
    suspendUser,
} from "../controllers/user.controller.js";



const router = express.Router();

// User specific Routes
router.get("/me", getUserDetails); // Get details of the logged-in user
router.put("/me", updateUserDetails); // Update logged-in user's details
router.put("/me/password", validatePassword, changePassword); // Change password for logged-in user
router.delete("/me", deleteSelf); // Delete logged-in user

// Admin Routes (only accessible by admins)
router.get("/admin", isAdmin, getAllUsers); // Get all users (admin only)
router.get("/admin/:userId", isAdmin, getUserById); // Get a user by ID (admin only)
router.put("/admin/:userId", isAdmin, updateUserDetailsByAdmin); // Update user details (admin only)
router.put("/admin/:userId/role", isAdmin, updateUserRole); // Update user role (admin only)
router.delete("/admin/:userId", isAdmin, deleteUser); // Delete user (admin only)
// router.put("/:userId/approve", isAdmin, approveUserEmail); // Approve user email (admin only)
// router.put("/:userId/suspend", isAdmin, suspendUser); // Suspend user (admin only)


export default router;
