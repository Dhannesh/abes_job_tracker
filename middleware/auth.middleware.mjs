import UserModel from "../model/User.model.mjs";
import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unauthenticated.error.mjs";

const authMiddleware = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "65b917931ee280b5d7dbf869";
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default authMiddleware;
