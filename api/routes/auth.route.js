import express from "express";
import {
	login,
	logout,
	signup,

	verifyEmail,
	resendVerificationEmail,

	forgotPassword,
	resetPassword,
} from "../controllers/auth.controller.js";

import {
	validatePassword,
	validateResetPassword
 } from "../middleware/validatePassword.js";

const router = express.Router();

router.post("/signup", validatePassword, signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/resend-verification-email/", resendVerificationEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", validatePassword, resetPassword);

export default router;
