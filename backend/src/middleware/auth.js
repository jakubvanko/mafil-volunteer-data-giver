import createError from "http-errors";
import jsonwebtoken from "jsonwebtoken";
import userService from "../services/userService.js";

const extractBearerToken = (req) => req.headers.authorization?.split(" ")?.[1];

const isAdmin = (req) =>
  extractBearerToken(req) === process.env.INCOMING_API_KEY;

const isUser = async (req) => {
  const tokenBody = jsonwebtoken.verify(
    extractBearerToken(req),
    process.env.TOKEN_SECRET
  );
  req.auth = { user: await userService.getUser(tokenBody._id) };
  return true;
};

const isUserFromParam = (param) => async (req) => {
  await isUser(req);
  return req.params[param] === req.auth.user._id.toString();
};

const isValidUserLogin = async (req) => {
  const tokenBody = jsonwebtoken.verify(
    extractBearerToken(req),
    process.env.LOGIN_TOKEN_SECRET
  );
  req.auth = { user: await userService.getUser(tokenBody._id) };
  return await req.auth.user.validateSecret(req.body.secret);
};

/**
 * Checks specified auth function.
 * If multiple functions are specified, at least one must be valid.
 **/
const check =
  (...authFunctions) =>
  async (req, _, next) => {
    for (const authFunction of authFunctions) {
      try {
        if ((await authFunction(req)) === true) {
          return next();
        }
      } catch {}
    }
    return next(createError(401));
  };

export default {
  check,
  isAdmin,
  isUser,
  isUserFromParam,
  isValidUserLogin,
};
