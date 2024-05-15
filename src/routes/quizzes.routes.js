import { Router } from "express";
import {
  getDefaultQuizzes,
  getQuizById,
  getQuizScore,
  reviewQuiz
} from "../controllers/quizzes.controller.js";

const router = Router();

router.get("/", getDefaultQuizzes);
router.get("/:id", getQuizById);
router.post("/:id/score", getQuizScore);
router.post("/:id/answers", reviewQuiz);

export default router;