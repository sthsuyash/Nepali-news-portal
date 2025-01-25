import multer from "multer";

// Configure multer for file handling (without saving locally)
const storage = multer.memoryStorage();  // Store the file in memory instead of the disk

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// Middleware to handle image uploads
export const uploadSingle = upload.single("image");