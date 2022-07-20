import createError from "http-errors";
import jwt from "jsonwebtoken";
import { getUser } from "../controllers/userController";

export const isUser = async (req, res, next) => {
  try {
    const result = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.TOKEN_SECRET
    );
    const user = await getUser(result._id);
    req.auth.user = user;
    return next();
  } catch (error) {
    return next(createError(401));
  }
};

export const isAdmin = (req, res, next) => {
  if (
    req.headers.authorization?.split(" ")?.[1] !== process.env.INCOMING_API_KEY
  ) {
    return next(createError(401));
  }
  return next();
};
