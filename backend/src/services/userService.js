import UserModel from "../models/userModel.js";

const generateLoginLink = (user) => {
  return user.generateLoginToken();
};

const requestDicomData = async (userId, dicomDataType) => {
  throw new Error("requestDicomData: Not implemented");
};

const createUser = async (
  name,
  email,
  secret,
  visitDate,
  studyInstanceUID,
  dicomDataType
) => {
  const user = new UserModel({
    name,
    email,
    secret,
    visitDate,
    studyInstanceUID,
  });
  await user.save();
  await requestDicomData(user._id, dicomDataType);
  return user;
};

export default {
  createUser,
  generateLoginLink,
};
