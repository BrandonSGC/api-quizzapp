import Quizzes from "../models/Quizzes.js";
import Questions from "../models/Questions.js";
import Options from "../models/Options.js";
import { getFormatedQuizReponse, getScore } from "../helpers/quizzes.js";

export const getDefaultQuizzes = async (req, res) => {
  try {
    const quizzes = await Quizzes.findAll({
      where: {
        user_id: null,
      },
    });

    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has ocurred in the server." });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getFormatedQuizReponse(id);

    // Send the formatted response
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has occurred on the server." });
  }
};

export const getQuizScore = async (req, res) => {
  try {
    const { id } = req.params;
    const answers = req.body;

    const result = await getScore(id, answers);

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error has occurred on the server." });
  }
};

export const reviewQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const answers = req.body;

    // Fetch quiz details.
    const quiz = await Quizzes.findByPk(id);
    const { id: quiz_id, name, image_url } = quiz;

    // Format response
    let reviewedQuiz = {
      id: quiz_id,
      name: name,
      image_url: image_url,
      questions: [],
    };

    // Fetch questions for the quiz.
    const questions = await Questions.findAll({
      where: {
        quiz_id: id,
      },
    });

    let reviewedQuestions = [];

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      // Get correct answer.
      const correct_answer = await Options.findOne({
        where: {
          question_id: question.dataValues.id,
          is_correct: true,
        },
      });
      // Get selected option.
      const selected_answer = await Options.findByPk(answers[i]);

      // Format reviewed question.
      const reviewedQuestion = {
        question_id: question.dataValues.id,
        description: question.dataValues.description,
        correct_answer: correct_answer.dataValues.description,
        selected_answer: selected_answer.dataValues.description,
        is_correct:
          selected_answer.dataValues.is_correct ===
          correct_answer.dataValues.is_correct,
      };

      //  Add reviewed question to the list.
      reviewedQuestions = [...reviewedQuestions, reviewedQuestion];
    }

    // Add reviewed questions to the reviewed quiz.
    reviewedQuiz = {
      ...reviewedQuiz,
      questions: reviewedQuestions,
      score: await getScore(id, answers),
    };

    res.status(200).json({ ...reviewedQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has ocurred on the server" });
  }
};