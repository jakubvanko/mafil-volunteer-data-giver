import createError from "http-errors";
import jwt from "jsonwebtoken";
import { getUser } from "../controllers/userController";

export const isUser = (req, res, next) => {
  try {
    const result = jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_SECRET);
    const user = await getUser(result._id);
    req.auth.user = user;
    next();
  } catch (error) {
    next(createError(401));
  }
};

export const isAdmin = (req, res, next) => {
  this.isUser(req, res, () => {
    // TODO: Check if admin
    next();
  });
};
