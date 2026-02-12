import express from "express";
import {createArtifact, getArtifacts} from "../controllers/artifactcontroller.js";
import { authMiddleware} from "../middlewares/authmiddleware.js";
import { authorizeRoles } from "../middlewares/rolemiddleware.js";
import { upload } from "../middlewares/uploadsmiddleware.js";
import {apiLimiter} from "../middlewares/ratelimitermiddleware.js";

const router = express.Router();

/**
 * Protected Artifact APIs
 */
router.post("/", authMiddleware, upload.single("file"), createArtifact);
router.get("/", authMiddleware,authorizeRoles("ADMIN"), apiLimiter, getArtifacts);
export default router;