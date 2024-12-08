import mongoose from "mongoose";

import { config } from "../config/index.js";
const MONGO_URI = config.db.url;

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connection to MongoDB: ", error.message);
		process.exit(1); // 1 is failure, 0 status code is success
	}
};
