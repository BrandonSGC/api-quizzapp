import Quizzes from "../models/Quizzes.js";
import Questions from "../models/Questions.js";
import Options from "../models/Options.js";
import { shuffleArray } from "./shuffleArray.js";

// Get Quiz Score.
export const getScore = async (quiz_id, answers) => {
  let result = {
    totalScore: 0,
    correctAnswers: 0,
    totalQuestions: await Questions.count({ where: { quiz_id } }),
  };

  for (const answerId of answers) {
    const answer = await Options.findByPk(answerId);
    if (answer.is_correct) {
      result = {
        ...result,
        totalScore: ++result.totalScore,
        correctAnswers: ++result.correctAnswers,
      };
    }
  }

  return result;
};

// Format quiz response.
export const getFormatedQuizReponse = async (id) => {
  const quiz = await Quizzes.findByPk(id);
  const questions = await Questions.findAll({ where: { quiz_id: id } });
  const { id: quiz_id, name, image_url } = quiz;

  let response = {
    id: quiz_id,
    name,
    image_url,
    questions: [],
  };

  for (const question of questions) {
    // Get question's options.
    const options = await Options.findAll({
      where: { question_id: question.dataValues.id },
    });

    // Extract and shuffle options.
    const shuffledOptions = options.map((option) => {
      const { id, question_id, description } = option.dataValues;
      return { id, question_id, description };
    });

    // Shuffle the options array.
    shuffleArray(shuffledOptions);

    const questionData = {
      ...question.dataValues,
      options: shuffledOptions,
    };

    // Add the question and its options to the response.
    response.questions = [...response.questions, questionData];
  }

  return response;
};
