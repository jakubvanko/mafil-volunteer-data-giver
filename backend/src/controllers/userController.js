import userService from "../services/userService.js";

const createUser = async (req, res) => {
  const { email, secret, visitDate } = req.body;
  const user = await userService.createUser(
    email,
    secret,
    visitDate,
    req.file.path
  );
  return res.status(201).json({ id: user._id });
};

const getUserFromParam = (param) => async (req, res) => {
  const { _id, expirationDate, visitDate } =
    req.auth?.user?._id === req.params[param]
      ? req.auth.user
      : await userService.getUser(req.params[param]);
  return res.status(200).json({
    id: _id,
    expirationDate,
    visitDate,
  });
};

const deleteUserFromParam = (param) => async (req, res) => {
  await userService.deleteUser(req.params[param]);
  return res.status(204).json();
};

const generateLoginToken = (req, res) => {
  return res.status(200).json({ token: req.auth.user.generateLoginToken() });
};

const getUserData = (req, res) => {
  throw new Error("getUserData: Not implemented");
};

export default {
  createUser,
  getUserFromParam,
  deleteUserFromParam,
  generateLoginToken,
  getUserData,
};
