import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { createResponse } from "../utils/responseModel.js"; // Import the response model

const JWT_SECRET = config.jwt.secret;

/**
 * Middleware to verify the JWT token and attach the decoded user information to `req.userId` and `req.userRole`.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 * @returns {void}
 */
export const verifyToken = (req, res, next) => {
	const token = req.cookies.token;

	// Token not found
	if (!token) {
		const response = createResponse(
			false,
			401,
			"Unauthorized - no token provided"
		);
		return res.status(401).json(response);
	}

	// Verify the token and extract user info
	try {
		const decoded = jwt.verify(token, JWT_SECRET);

		// If no decoded information is returned, the token is invalid
		if (!decoded) {
			const response = createResponse(
				false,
				401,
				"Unauthorized - invalid token"
			);
			return res.status(401).json(response);
		}

		// Attach user information to the request object for further processing
		req.userId = decoded.userId;
		req.userRole = decoded.role;
		next(); // Proceed to the next middleware
	} catch (error) {
		console.error("Error in verifyToken: ", error);
		const response = createResponse(
			false,
			500,
			"Server error",
			null,
			error.message
		);
		return res.status(500).json(response);
	}
};

/**
 * Middleware to check if the user has 'admin' role.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 * @returns {void}
 */
export const isAdmin = (req, res, next) => {
	console.log(req.userRole);
	// Check if the user has the 'admin' role
	if (req.userRole !== "ADMIN") {
		const response = createResponse(
			false,
			403,
			"Unauthorized - not an admin"
		);
		return res.status(403).json(response);
	}
	next();
};

/**
 * Middleware to check if the user has 'user' role.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 * @returns {void}
 */
export const isUser = (req, res, next) => {
	// Check if the user has the 'user' role
	if (req.userRole !== "USER") {
		const response = createResponse(
			false,
			403,
			"Unauthorized - not a user"
		);
		return res.status(403).json(response);
	}
	next();
};

/**
 * Middleware to check if the user is either 'admin' or 'user'.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 * @returns {void}
 */
export const isAdminOrUser = (req, res, next) => {
	// Check if the user has either 'admin' or 'user' role
	if (req.userRole !== "ADMIN" && req.userRole !== "USER") {
		const response = createResponse(
			false,
			403,
			"Unauthorized - not an admin or user"
		);
		return res.status(403).json(response);
	}
	next();
};
