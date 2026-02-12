import { getChatByThread, sendChat, 
    // markMessagesAsRead
 } from "../controllers/chatcontroller.js";
import express from "express";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/:threadId", authMiddleware, getChatByThread);
router.post("/", authMiddleware, sendChat);
// router.patch("/:threadId/read", authMiddleware, markMessagesAsRead);

export default router;