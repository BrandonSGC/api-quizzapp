import { Router } from "express";
import {
  getAllQuizzes,
  getDetailedQuizInfo,
  createQuiz,
} from "../controllers/quizzes.controller.js";

const router = Router();

router.get("/", getAllQuizzes);
router.get("/:id", getDetailedQuizInfo);
router.post("/", createQuiz);

export default router;
