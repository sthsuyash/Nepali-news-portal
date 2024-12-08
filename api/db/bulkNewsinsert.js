import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { Post } from "../models/post.model.js";  // Adjust path to your Post model
import { config } from "../config/index.js";  // Ensure path to config is correct

/**
 * Utility function to bulk insert posts from a JSON file.
 * This should be run as an npm script to insert posts into the database.
 * @returns {Promise<void>} - Resolves when the posts are inserted.
 */
const bulkInsertPosts = async () => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const JSON_FILE_PATH = path.join(__dirname, 'news.json');

    try {
        // Read the JSON file
        const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
        const posts = JSON.parse(data);

        // Check if the file has valid data
        if (!Array.isArray(posts) || posts.length === 0) {
            console.log("No valid posts data found in the JSON file.");
            return;
        }

        // Bulk insert the posts data into MongoDB
        const result = await Post.insertMany(posts);

        console.log(`${result.length} posts were inserted successfully.`);
    } catch (error) {
        console.error("Error inserting posts:", error);
    }
};

// Main logic to connect to MongoDB and bulk insert posts
const insert = async () => {
    const MONGO_URI = config.db.url; 

    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Call the bulk insert function after MongoDB connection
        await bulkInsertPosts();

        // Disconnect from MongoDB after the operation
        await mongoose.disconnect();

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

insert();
