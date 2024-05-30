import { Op } from "sequelize";
import dotenv from "dotenv";
import Quizzes from "../models/Quizzes.js";
import Questions from "../models/Questions.js";
import Options from "../models/Options.js";
import { getFormatedQuizReponse, getScore } from "../helpers/quizzes.js";

dotenv.config();

export const getDefaultQuizzes = async (req, res) => {
  try {
    // Get user id
    const { id } = req.query;

    // Find all default quizzes. If user is provided, get their quizzes as well.
    const quizzes = await Quizzes.findAll({
      where: {
        user_id: {
          [Op.or]: [id ? id : null, null],
        },
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


export const createQuiz = async (req, res) => {
  try {
    const { name, user_id, questions } = req.body;
    const image = req.file;

    const parsedQuestions = JSON.parse(questions);

    // Create quiz.
    const quiz = await Quizzes.create({
      name,
      user_id,
      image_url: `/images/${image.filename}`,
    });

    // Create questions and its options.
    for (let i = 0; i < parsedQuestions.length; i++) {
      // Create question.
      const { description } = parsedQuestions[i];
      const question = await Questions.create({
        description,
        quiz_id: quiz.dataValues.id,
      });

      // Create options.
      for (let j = 0; j < parsedQuestions[i].options.length; j++) {
        const { description, is_correct} = parsedQuestions[i].options[j];
        const option = await Options.create({
          question_id: question.dataValues.id,
          description,
          is_correct,
        });
      }
    }

    const quizResponse = await getFormatedQuizReponse(quiz.dataValues.id);
    res
      .status(200)
      .json({ message: "Quiz created successfully.", quiz: quizResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has occurred in the server." });
  }
};


export const deleteQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    const quizFound = await Quizzes.findByPk(id);

    // Validate quiz exists.
    if (!quizFound) {
      return res.status(404).json({message: "Quiz not found."});
    }
    // Validate is not a default quiz.
    if (quizFound.user_id === null) {
      return res.status(403).json({message: "Cannot delete a default quiz."});
    }


    // TODO: Delete quiz image from the server.
    const image_url = quizFound.image_url;

    // Delete quiz.
    await quizFound.destroy();
    res.status(200).send({message: "Quiz deleted successfully.", quiz: quizFound});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has occurred in the server." });
  }
};