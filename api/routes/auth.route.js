import express from "express";
import {
	login,
	logout,
	signup,

	verifyEmail,
	resendVerificationEmail,

	forgotPassword,
	resetPassword,

	adminLogin,
} from "../controllers/auth.controller.js";

import {
	validatePassword,
	validateResetPassword
 } from "../middleware/validatePassword.js";

const router = express.Router();

// admin dashboard routes
router.post("/admin/login", adminLogin);

// user client routes
router.post("/signup", validatePassword, signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/resend-verification-email/", resendVerificationEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", validateResetPassword, resetPassword);

export default router;
