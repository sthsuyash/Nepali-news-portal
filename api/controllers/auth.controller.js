import jwt from "jsonwebtoken";

import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
	sendWelcomeEmail,
	sendVerificationEmail,
	sendPasswordResetEmail,
	sendResetSuccessEmail
} from "../mail/nodemailer/emails.js";
import prisma from "../config/prisma.js"
import { createResponse } from "../utils/responseModel.js";
import { config } from "../config/index.js";

const CLIENT_URL = config.server.clientURL;
const JWT_SECRET = config.jwt.secret;

/**
 * Registers a new user in the system, hashes their password, and sends a verification email.
 * @param {Object} req - The Express request object containing the user's registration data.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const signup = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		if (!email || !password || !name) {
			throw new Error("All fields are required");
		}

		// check if email is valid
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw new Error("Invalid email");
		}

		const userAlreadyExists = await prisma.user.findUnique({
			where: { email },
			include: { role: true }
		});

		if (userAlreadyExists) {
			return res.status(400).json(createResponse(
				false,
				400,
				"User already exists"
			));
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				verificationToken,
				role: { connect: { name: "USER" } },
				verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
			},
			include: { role: true }
		});

		generateTokenAndSetCookie(res, user.id, "USER");

		await sendVerificationEmail(user.email, verificationToken);

		const return_user = {
			id: user.id,
			email: user.email,
			name: user.name,
			phone: user.phone,
			lastLogin: user.lastLogin,
			isVerified: user.isVerified,
			role: { name: user.role.name },
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		}

		res.status(201).json(createResponse(
			true,
			201,
			"User created successfully",
			{ ...return_user }
		));
	} catch (error) {
		res.status(400).json(createResponse(false, 400, error.message));
	}
};

/**
 * Verifies the user's email using a verification code sent during signup.
 * @param {Object} req - The Express request object containing the verification code.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const verifyEmail = async (req, res) => {
	const { code } = req.body;

	try {
		const user = await prisma.user.findFirst({
			where: {
				verificationToken: code,
				verificationTokenExpiresAt: {
					gt: new Date()
				}, // Ensure token is not expired
			},
		});

		if (!user) {
			return res.status(400).json(createResponse(
				false,
				400,
				"Invalid or expired verification code"
			));
		}

		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: {
				isVerified: true,
				verificationToken: null,
				verificationTokenExpiresAt: null,
			},
			include: { role: true }
		});

		const return_user = {
			id: updatedUser.id,
			email: updatedUser.email,
			name: updatedUser.name,
			phone: updatedUser.phone,
			lastLogin: updatedUser.lastLogin,
			isVerified: updatedUser.isVerified,
			role: { name: updatedUser.role.name },
			createdAt: updatedUser.createdAt,
			updatedAt: updatedUser.updatedAt
		}

		await sendWelcomeEmail(updatedUser.email, updatedUser.name);

		res.status(200).json(createResponse(
			true,
			200,
			"Email verified successfully",
			{ ...return_user }
		));
	} catch (error) {
		res.status(500).json(createResponse(false, 500, "Server error"));
	}
};

/**
 * Logs a user into the system by validating their email and password.
 * @param {Object} req - The Express request object containing the user's login credentials (email and password).
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: { email },
			include: { role: true }
		});

		if (!user) {
			return res.status(400).json(createResponse(
				false,
				400,
				"Invalid credentials"
			));
		}

		const isPasswordValid = await bcryptjs.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(400).json(createResponse(
				false,
				400,
				"Invalid credentials"
			));
		}

		generateTokenAndSetCookie(res, user.id, user.role.name);

		user.lastLogin = new Date();
		await prisma.user.update({
			where: { id: user.id },
			data: { lastLogin: user.lastLogin },
		});

		const returnUser = {
			id: user.id,
			email: user.email,
			name: user.name,
			phone: user.phone,
			lastLogin: user.lastLogin,
			isVerified: user.isVerified,
			role: { name: user.role.name },
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		}

		res.status(200).json(createResponse(
			true,
			200,
			"Logged in successfully",
			{ ...returnUser }
		));
	} catch (error) {
		res.status(400).json(createResponse(
			false,
			400,
			error.message
		));
	}
};

/**
 * Sends a password reset link to the user's email address.
 * @param {Object} req - The Express request object containing the user's email.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;

		// Find user by email
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return res.status(400).json(createResponse(false, 400, "User not found"));
		}

		// Generate a JWT reset token
		const resetToken = jwt.sign(
			{ email: user.email },
			JWT_SECRET,
			{ expiresIn: "1h" } // Token expires in 1 hour
		);

		// Send email with the reset link
		await sendPasswordResetEmail(
			user.email,
			`${CLIENT_URL}/reset-password/${resetToken}`
		);

		res.status(200).json(createResponse(true, 200, "Password reset link sent to your email"));
	} catch (error) {
		res.status(400).json(createResponse(false, 400, error.message));
	}
};


/**
 * Resets the user's password using a valid reset token and a new password.
 * @param {Object} req - The Express request object containing the reset token from the URL and new password.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		// Verify the JWT token
		let decoded;
		try {
			decoded = jwt.verify(token, JWT_SECRET);
		} catch (err) {
			return res.status(400).json(createResponse(
				false,
				400,
				"Invalid or expired reset token"
			));
		}

		// Find user by email extracted from the token
		const user = await prisma.user.findUnique({
			where: {
				email: decoded.email
			},
		});

		if (!user) {
			return res.status(400).json(createResponse(
				false,
				400,
				"Invalid or expired reset token"
			));
		}

		// Update the user's password
		const hashedPassword = await bcryptjs.hash(password, 10);
		await prisma.user.update({
			where: { id: user.id },
			data: { password: hashedPassword },
		});

		await sendResetSuccessEmail(user.email);

		res.status(200).json(createResponse(true, 200, "Password reset successful"));
	} catch (error) {
		res.status(400).json(createResponse(false, 400, error.message));
	}
};

/**
 * Logs the user out by clearing the authentication token from cookies.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json(createResponse(
		true,
		200,
		"Logged out successfully"
	));
};

/**
 * Resends the verification email to the user's email address.
 * @param {Object} req - The Express request object containing the user's email.
 * @param {Object} res - The Express response object to send back the response.
 * @returns {void}
 */
export const resendVerificationEmail = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: { email }
		});

		if (!user) {
			return res.status(400).json(createResponse(
				false,
				400,
				"User not found"
			));
		}

		if (user.isVerified) {
			return res.status(400).json(createResponse(
				false,
				400,
				"User is already verified"
			));
		}

		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: {
				verificationToken,
				verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
			}
		});

		await sendVerificationEmail(updatedUser.email, verificationToken);

		res.status(200).json(createResponse(
			true,
			200,
			"Verification email sent successfully"
		));
	} catch (error) {
		res.status(400).json(createResponse(
			false,
			400,
			error.message
		));
	}
}

