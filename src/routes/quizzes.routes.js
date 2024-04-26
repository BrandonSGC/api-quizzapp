import { Router } from "express";
import {
  getDefaultQuizzes,
  getQuizById,
} from "../controllers/quizzes.controller.js";

const router = Router();

router.get("/", getDefaultQuizzes);
router.get("/:id", getQuizById);

export default router;
