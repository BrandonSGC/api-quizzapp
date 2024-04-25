import { Op } from "sequelize";
import Quizzes from "../models/Quizzes.js";
import Questions from "../models/Questions.js";
import Options from "../models/Options.js";

export const getDefaultQuizzes = async (req, res) => {
  try {
    const quizzes = await Quizzes.findAll({
      where: {
        user_id: null,
      },
    });

    // Get default and user Quizzes.
    // const quizzes = await Quizzes.findAll({
    //   where: {
    //     [Op.or]: [
    //       {user_id: null},
    //       {user_id: 1},
    //     ]
    //   }
    // });

    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has ocurred in the server." });
  }
};

export const getQuizzById = async (req, res) => {
  try {
    const { id } = req.params;

    /* Waits for all promises in the array to resolve. When they 
    all resolve, it returns an array containing the resolved 
    values in the same order as the promises in the input array */
    const [quiz, questions, options] = await Promise.all([
      Quizzes.findByPk(id),
      Questions.findAll({ where: { quiz_id: id } }),
      Options.findAll({ where: { question_id: id } }),
    ]);

    // Format quiz response.
    const response = formatQuizResponse(quiz, questions, options);

    // Send the formatted response
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has occurred on the server." });
  }
};

// Function to format the Quiz Response.
const formatQuizResponse = (quiz, questions, options) => {
  const { id: quiz_id, name, user_id, image_url } = quiz.dataValues;

  // Create the response object.
  const response = {
    id: quiz_id,
    name,
    user_id,
    image_url,
    questions: questions.map((question) => ({
      question_id: question.id,
      quiz_id: question.quiz_id,
      description: question.description,
      options: options.map((option) => ({
        option_id: option.id,
        description: option.description,
        is_correct: option.is_correct,
      })),
    })),
  };

  return response;
};
