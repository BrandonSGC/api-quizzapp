import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routers
app.use("/api/users", usersRoutes);

app.get("/", (_req, res) => {
  res.send("Hello World");
});
