export const formatQuizResponse = (quiz, questions, options) => {
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
