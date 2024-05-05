import jwt from "jsonwebtoken";

export const authRequired = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  // Validate token.
  jwt.verify(token, "secret123", (error, user) => {
    if (error) return res.status(403).json({ message: "Invalid token" });
    // Save user data to the request, so it can be accessed.
    req.user = user;
    next();
  });
};