import UserModel from "../models/userModel.js";
import mailService from "./mailService.js";
import fs from "fs";

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

const getUser = (id) => UserModel.findById(id).exec();

const getUsersByStudyInstanceUID = (studyInstanceUID) =>
  UserModel.find({ studyInstanceUID }, "_id").exec();

const deleteUser = (id) => UserModel.findByIdAndDelete(id).exec();

const deleteExpiredUsers = async () => {
  const deleted = await UserModel.deleteMany()
    .where("expirationDate")
    .lte(Date.now())
    .exec();
  console.log(`Deleted ${deleted.deletedCount} expired users`);
};

const getUserDataSize = async (dicomDataPath) =>
  (await fs.promises.stat(dicomDataPath)).size / (1024 * 1024 * 1024);

const processDicomData = async (userId, files) => {
  mailService.sendLoginEmail(
    user.email,
    user.name,
    user.visitDate,
    generateLoginLink(user)
  );
  throw new Error("processDicomData: Not implemented");
};

export default {
  createUser,
  getUser,
  deleteUser,
  deleteExpiredUsers,
  getUserDataSize,
  getUsersByStudyInstanceUID,
  processDicomData,
};
