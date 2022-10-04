import createError from "http-errors";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import Log from "../models/logModel.js";

const extractBearerToken = (req) =>
  req.headers.authorization?.split(" ")?.[1] ?? req.body.access_token;

const getUserFromToken = async (req, tokenSecret) => {
  const tokenBody = jsonwebtoken.verify(extractBearerToken(req), tokenSecret);
  req.auth = { user: await UserModel.promiseFindById(tokenBody._id) };
};

const isAdmin = (req) =>
  extractBearerToken(req) === process.env.INCOMING_API_KEY;

const isUserFromParam = (param) => async (req) => {
  await getUserFromToken(req, process.env.TOKEN_SECRET);
  return req.params[param] === req.auth.user._id.toString();
};

const isValidUserLogin = async (req) => {
  await getUserFromToken(req, process.env.EMAIL_TOKEN_SECRET);
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
    Log.createLog({
      eventType: "AUTH",
      eventName: "AUTH_INVALID",
      message: `Invalid auth data submitted`,
      details: {},
    });
    return next(createError(401));
  };

export default {
  check,
  isAdmin,
  isUserFromParam,
  isValidUserLogin,
};
