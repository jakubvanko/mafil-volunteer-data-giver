import UserModel from "../models/userModel.js";

const processDicomData = (path) => {
  throw new Error("processDicomData: Not implemented");
};

const sendLoginEmail = (user) => {
  throw new Error("sendLoginEmail: Not implemented");
};

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

const getUser = (id) => UserModel.findById(id).exec();

const deleteUser = (id) => UserModel.findByIdAndDelete(id).exec();

export default {
  createUser,
  getUser,
  deleteUser,
};
