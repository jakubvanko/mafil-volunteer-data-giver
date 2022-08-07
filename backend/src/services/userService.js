import UserModel from "../models/userModel.js";

const createUser = async (
  email,
  secret,
  visitDate,
  unprocesedDicomFilePath
) => {
  const dicomDataPath = processDicomData(unprocesedDicomFilePath);
  const user = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    email,
    secret,
    dicomDataPath,
    visitDate,
  });
  await user.save();
  sendLoginEmail(user);
  return user;
};

const processDicomData = (path) => {
  throw new Error("processDicomData: Not implemented");
};

const sendLoginEmail = (user) => {
  throw new Error("sendLoginEmail: Not implemented");
};

const getUser = async (id) => {
  throw new Error("getUser: Not implemented");
};

const deleteUser = async (id) => {
  throw new Error("deleteUser: Not implemented");
};

export default {
  createUser,
  getUser,
  deleteUser,
};
