import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authroutes.js";
import artifactRoutes from "./routes/artifactsroutes.js";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true ,limit: "10mb" }));
app.use(morgan("dev"));

app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to the CMS API" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/artifacts", artifactRoutes);

export default app;
