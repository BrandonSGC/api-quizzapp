import { Router } from "express";
import {
  getDefaultQuizzes,
  getQuizzById,
} from "../controllers/quizzes.controller.js";

const router = Router();

router.get("/", getDefaultQuizzes);
router.get("/:id", getQuizzById);

export default router;
