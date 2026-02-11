import { toogleLike } from "../controllers/likescontroller.js";
import express from "express";

const router = express.Router();

router.post("/:artifactId", toogleLike);

export default router;