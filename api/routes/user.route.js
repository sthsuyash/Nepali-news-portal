import express from "express";

import { isAdmin } from "../middleware/verifyToken.js";
import { validatePassword } from "../middleware/validatePassword.js";

import {
    getUserDetails,
    updateUserDetails,
    changePassword,
    deleteSelf,

    approveUserEmail,
    updateUserRole,
    
    getAllUsers,
    getUserById,
    updateUserDetailsById,
    deleteUserById,
    suspendUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Admin Routes (only accessible by admins)
router.get("/admin", isAdmin, getAllUsers);
router.get("/admin/:userId", isAdmin, getUserById);
router.put("/admin/:userId", isAdmin, updateUserDetailsById);
router.put("/admin/:userId/role", isAdmin, updateUserRole);
router.delete("/admin/:userId", isAdmin, deleteUserById);

router.put("/admin/:userId/approve", isAdmin, approveUserEmail);
router.put("/admin/:userId/suspend", isAdmin, suspendUser); 

// User specific Routes
router.get("/me", getUserDetails); // Get details of the logged-in user
router.put("/me", updateUserDetails); // Update logged-in user's details
router.put("/me/password", validatePassword, changePassword); // Change password for logged-in user
router.delete("/me", deleteSelf); // Delete logged-in user

export default router;
