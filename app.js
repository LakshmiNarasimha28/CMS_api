import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authroutes.js";
import artifactRoutes from "./routes/artifactroutes.js";
import cookieParser from "cookie-parser";
import likesRoutes from "./routes/likesroutes.js";
import commentRoutes from "./routes/commentsroutes.js";
import cloudinary from "./config/cloudinary.js";
import { testingCron } from "./cron/testing.js";
import chatRoutes from "./routes/chatroutes.js";


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
app.use("/likes", likesRoutes);
app.use("/comments", commentRoutes);
app.use("/chats", chatRoutes);

export default app;

testingCron();

// app.use(cors({
//   origin: ["https://cms-admin.vercel.app"],
//   credentials: true
// }));