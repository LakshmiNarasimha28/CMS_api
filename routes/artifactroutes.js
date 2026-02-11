import express from "express";
import {createArtifact, getArtifacts} from "../controllers/artifactcontrollers.js";
import { authMiddleware} from "../middlewares/authmiddleware.js";
import { authorizeRoles } from "../middlewares/rolemiddleware.js";


const router = express.Router();

/**
 * Protected Artifact APIs
 */
router.post("/", authMiddleware, createArtifact);
router.get("/", authMiddleware,authorizeRoles("ADMIN"), getArtifacts);
export default router;