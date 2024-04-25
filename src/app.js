import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import quizzesRoutes from "./routes/quizzes.routes.js";

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routers
app.use("/api/users", usersRoutes);
app.use("/api/quizzes", quizzesRoutes);

app.get("/", (_req, res) => {
  res.send("Hello World");
});
