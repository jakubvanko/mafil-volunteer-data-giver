import userService from "../services/userService";

const createUser = (req, res) => {
  const { email, secret, visitDate } = req.body;
  const user = userService.createUser(email, secret, visitDate, req.file.path);
  return res.status(201).json({ id: user._id });
};

const getUser = (req, res) => {
  throw new Error("getUser: Not implemented");
};

const deleteUser = (req, res) => {
  throw new Error("deleteUser: Not implemented");
};

const generateLoginToken = (req, res) => {
  throw new Error("generateLoginToken: Not implemented");
};

const getUserData = (req, res) => {
  throw new Error("getUserData: Not implemented");
};

export default {
  createUser,
  getUser,
  deleteUser,
  generateLoginToken,
  getUserData,
};
