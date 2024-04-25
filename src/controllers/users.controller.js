import Users from "../models/Users.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.send(users);
  } catch (error) {
    console.error(error);
  }
};
