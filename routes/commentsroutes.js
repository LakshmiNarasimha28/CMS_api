import express from "express";
import { addComment, getComments } from "../controllers/commentscontroller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/:id/comments", authMiddleware, addComment);
router.get("/:id/comments", getComments);

export default router;