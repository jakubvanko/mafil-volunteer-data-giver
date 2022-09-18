import userService from "../services/userService.js";
import UserModel from "../models/userModel.js";

const createUser = async (req, res) => {
  const { name, email, secret, visitDate, studyInstanceUID, dicomDataType } =
    req.body;
  const user = await userService.createUser(
    name,
    email,
    secret,
    visitDate,
    studyInstanceUID,
    dicomDataType
  );
  return res.status(201).json({ id: user._id });
};

const getUserFromParam = (param) => async (req, res) => {
  const user =
    req.auth?.user?._id === req.params[param]
      ? req.auth.user
      : await UserModel.promiseFindById(req.params[param]);
  return res.status(200).json({
    id: user._id,
    expirationDate: user.expirationDate,
    visitDate: user.visitDate,
    dataSize: await user.getDataPackageSize(),
  });
};

const deleteUserFromParam = (param) => async (req, res) => {
  await UserModel.promiseDeleteById(req.params[param]);
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

const processDicomDataFromParam =
  (userParam, filesParam) => async (req, res) => {
    const user = await UserModel.promiseFindById(req.params[userParam]);
    await user.createDataPackage(req.params[filesParam]);
    mailService.sendLoginEmail(
      user.email,
      user.name,
      user.visitDate,
      userService.generateLoginLink(user)
    );
    return res.status(204).json();
  };

const getUsersByStudyInstanceFromParam = (param) => async (req, res) => {
  return res
    .status(200)
    .json(await UserModel.findByStudyInstanceUID(req.params[param]));
};

export default {
  createUser,
  getUserFromParam,
  deleteUserFromParam,
  generateUserToken,
  getUserData,
  processDicomDataFromParam,
  getUsersByStudyInstanceFromParam,
};
