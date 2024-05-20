import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import usersRoutes from "./routes/users.routes.js";
import quizzesRoutes from "./routes/quizzes.routes.js";

export const app = express();

// Get the resolved path to the file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if doesn't exist.
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (_, res) => res.send("Hello World"));
app.use("/api/users", usersRoutes);
app.use("/api/quizzes", quizzesRoutes);

// Serve Static Files.
app.use("/images", express.static(path.join(__dirname, "uploads")));