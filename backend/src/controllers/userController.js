import userService from "../services/userService.js";

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
  const { _id, expirationDate, visitDate, dicomDataPath } =
    req.auth?.user?._id === req.params[param]
      ? req.auth.user
      : await userService.getUser(req.params[param]);
  return res.status(200).json({
    id: _id,
    expirationDate,
    visitDate,
    dataSize: await userService.getUserDataSize(dicomDataPath),
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

const processDicomDataFromParam =
  (userParam, filesParam) => async (req, res) => {
    await userService.processDicomData(
      req.params[userParam],
      req.params[filesParam]
    );
    return res.status(204).json();
  };

const getUsersByStudyInstanceFromParam = (param) => async (req, res) => {
  return res
    .status(200)
    .json(await userService.getUsersByStudyInstanceUID(req.params[param]));
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
