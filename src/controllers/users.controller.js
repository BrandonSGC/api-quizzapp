import Users from "../models/Users.js";

export const getUserById = async (req, res) => {
  try {
    // Get user id.
    const { id } = req.params;

    //TODO: Validate id.

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