import userService from "../services/userService.js";

const createUser = async (req, res) => {
  const { name, email, secret, visitDate } = req.body;
  const user = await userService.createUser(
    name,
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

const generateUserToken = (req, res) => {
  return res
    .status(200)
    .json({ id: req.auth.user._id, token: req.auth.user.generateUserToken() });
};

const getUserData = (req, res) => {
  return res.status(200).download(req.auth.user.dicomDataPath);
};

export default {
  createUser,
  getUserFromParam,
  deleteUserFromParam,
  generateUserToken,
  getUserData,
};
