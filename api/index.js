import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import { config } from "./config/index.js";
import { connectDB } from "./db/connectDB.js";
import { morganConfig } from "./logging/morganConfig.js";
import { createResponse } from "./utils/responseModel.js";

dotenv.config();

const PORT = config.server.port; // Server port from config
const NODE_ENV = config.server.nodeEnv; // Environment mode (development/production)
let CLIENT_URL; // Client URL for CORS

const app = express();
const __dirname = path.resolve();

// in development, allow all origins, else allow only the client URL
if (NODE_ENV === "development") {
	CLIENT_URL = "*"; // This allows all origins
} else {
	CLIENT_URL = config.server.clientURL;
}

// Enable CORS for all origins
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true, // Allow credentials like cookies
}));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(express.json());
app.use(cookieParser());
app.use(morganConfig);
app.use("/api/v2/", routes);

// Production environment-specific handling
if (NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	/**
	 * Catch-all route handler for the production environment.
	 * Returns the index.html file to support client-side routing (e.g., React Router).
	 * @param {Object} req - The request object.
	 * @param {Object} res - The response object.
	 */
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// 404 handler for unknown routes
app.use((req, res, next) => {
	const response = createResponse(
		false,
		404,
		`Route ${req.originalUrl} not found`
	);
	res.status(404).json(response);
});

// Global error handler for other errors (e.g., server or internal errors)
app.use((err, req, res, next) => {
	console.error(err); // Log the error for debugging purposes
	const response = createResponse(
		false,
		500,
		"Internal server error",
		null,
		err.message
	);
	res.status(500).json(response);
});

app.listen(PORT, () => {
	// connectDB();
	console.log(`Server is running on: http://localhost:${PORT}/api/v2`);
});
