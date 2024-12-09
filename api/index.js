import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression"; // For gzip compression of responses

import routes from "./routes/index.js";
import { config } from "./config/index.js";
import { morganConfig } from "./logging/morganConfig.js";
import { createResponse } from "./utils/responseModel.js";

dotenv.config();

const PORT = config.server.port;
const NODE_ENV = config.server.nodeEnv;
let CLIENT_URL;

const app = express();
const __dirname = path.resolve();

// Environment-specific CORS configuration
if (NODE_ENV === "development") {
	CLIENT_URL = "http://localhost:5173"
} else {
	CLIENT_URL = config.server.clientURL;
}

// Enable CORS with dynamic configuration based on environment
app.use(cors({
	origin: CLIENT_URL, // Allow client URL origin in production
	credentials: true, // Allow credentials like cookies
}));

// Security middleware (Helmet helps secure HTTP headers)
app.use(helmet());

// Compression middleware for faster response (gzip)
app.use(morganConfig);
app.use(compression());

// Body parsing middleware
app.use(express.json());
app.use(cookieParser());

// Routes configuration
app.use("/api/v2/", routes);

// Production environment-specific handling
if (NODE_ENV === "production") {
	// Serve static files (e.g., React build)
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	/**
	 * Catch-all route handler for the production environment.
	 * Returns the index.html file to support client-side routing (e.g., React Router).
	 */
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
} else {
	// Development route: Hello World for quick testing
	app.get("/", (req, res) => {
		res.json(createResponse(
			true,
			200,
			"Hello World! Welcome to the News Portal API"
		));
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
	console.log(`Server is running on: http://localhost:${PORT}/api/v2`);
});
