import { Op } from "sequelize";
import Users from "../models/Users.js";
import { sendWelcomeEmail } from "../helpers/sendWelcomeEmail.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../helpers/jwt.js";

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
    
    // TODO: Validate data -> express-validator

    // Validate email or username not registered in DB already.
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

    // Hash the password.
    const passwordHash = await bcrypt.hash(password, 10);

    // Save user in DB.
    const user = await Users.create({
      name,
      surname,
      email,
      username,
      password: passwordHash,
    });

    // Create token.
    const token = await createAccessToken({ id: user.id });
    // Set token in cookie.
    res.cookie("token", token);
    // Send response
    res.status(201).json({
      message: "User created succesfully.",
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        username: user.username,
      },
    });

    // Send email notification.
    await sendWelcomeEmail(email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has occured in the server." });
  }
};

export const login = async (req, res) => {
  try {
    // Recieve user data from frontend.
    const { username, password } = req.body;

    const userExists = await Users.findOne({
      where: {
        username: username,
      },
    });

    if (!userExists) {
      res.status(400).json({ message: "User not found." });
      return;
    }

    // TODO: Compare hashed password with hashed password in database.

    res.status(200).json({ message: "Login succesfull" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has occured in the server." });
  }
};
