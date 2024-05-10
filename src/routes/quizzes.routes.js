import { Router } from "express";
import {
  getDefaultQuizzes,
  getQuizById,
  getQuizScore,
} from "../controllers/quizzes.controller.js";

const router = Router();

router.get("/", getDefaultQuizzes);
router.get("/:id", getQuizById);
router.post("/:id/score", getQuizScore);

export default router;