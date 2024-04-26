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


// Format quiz response.
const getFormatedQuizReponse = async (id) => {
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
    // Get questions's options.
    const options = await Options.findAll({
      where: { question_id: question.dataValues.id },
    });

    const questionData = {
      ...question.dataValues,
      // .map() returns all the question's options.
      options: [...options.map((option) => option.dataValues)],
    };

    // Add the questions and its options to the response.
    response.questions = [...response.questions, questionData];
  }

  return response;
};