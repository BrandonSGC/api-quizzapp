import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      "secret123",
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject();
        resolve(token);
      }
    );
  })
}