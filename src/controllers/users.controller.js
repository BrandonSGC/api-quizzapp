import { Op } from "sequelize";
import Users from "../models/Users.js";
import { sendEmail } from "../helpers/sendEmail.js";

export const getUserById = async (req, res) => {
  try {
    // Get user id.
    const { id } = req.params;

    //TODO: Validate id -> express validator.

    // Validate we have a user.
    const user = await Users.findByPk(id);

    if (user) {
      res.status(200).json(user);
      return;
    }

    res.status(200).json({ message: "We couldn't found the user." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has occured in the server." });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, surname, email, username, password } = req.body;
    // Validate data.

    // Validate email or username not registered in db already.
    const userExists = await Users.findOne({
      where: {
        [Op.or]: {
          email: email,
          username: username,
        },
      },
    });

    if (userExists) {
      console.log("User already exists");
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // Create user.
    const user = await Users.create({
      name,
      surname,
      email,
      username,
      password,
    });

    // Send email notification.
    const emailConfig = {
      from: "bransti20@gmail.com",
      to: email,
      subject: "QuizzApp - Welcome to QuizzApp Family!",
      html: `
        <h1>QuizzApp</h1>
        <h2>Welcome to our QuizzApp Family</h2>
        <p>We hope you can enjoy and have some fun playing the default quizzes or the ones created by you!</p>
        <p>Regards, QuizzApp Team.</p>`,
    };

    const emailInfo = await sendEmail(emailConfig);
    console.log(emailInfo.messageId);

    res.status(201).json({ message: "User created succesfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has occured in the server." });
  }
};
