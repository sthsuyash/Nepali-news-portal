import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

const JWT_SECRET = config.jwt.secret;
const NODE_ENV = config.server.nodeEnv;

export const generateTokenAndSetCookie = (res, userId, role) => {
	const token = jwt.sign(
		{ userId, role },
		JWT_SECRET,
		{ expiresIn: "7d" }
	);

	res.cookie("token", token, {
		httpOnly: true,
		secure: NODE_ENV === "production",  // Ensure the cookie is sent over HTTPS in production
		sameSite: "strict",  // Prevents the browser from sending the cookie along with cross-site requests
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});

	return token;
};
