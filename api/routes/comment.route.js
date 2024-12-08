import express from "express"
// import {
//     addComment,
//     editComment,
//     deleteComment,
//     getPostComments
// } from "../controllers/comment.controller.js"
// import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Comments route")
});

// router.get("/:postId", getPostComments)
// router.post("/:postId", verifyToken, addComment)
// router.put("/:id", verifyToken, editComment)
// router.delete("/:id", verifyToken, deleteComment)

export default router 