import { Router } from "express";
import { upload } from '../middlewares/multer.js';
import {
  getDefaultQuizzes,
  getQuizById,
  getQuizScore,
  reviewQuiz,
  createQuiz,
} from "../controllers/quizzes.controller.js";

const router = Router();

router.get("/", getDefaultQuizzes);
router.get("/:id", getQuizById);
router.post("/:id/score", getQuizScore);
router.post("/:id/answers", reviewQuiz);
// Parameter of .single() must be the name of the input file.
router.post("/create", upload.single('image'), createQuiz);

export default router;