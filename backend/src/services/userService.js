import UserModel from "../models/userModel.js";
import mailService from "./mailService.js";

const processDicomData = (path) => {
  return "src\\app.js";
  throw new Error("processDicomData: Not implemented");
};

const generateLoginLink = (user) => {
  return user.generateLoginToken();
};

const createUser = async (
  name,
  email,
  secret,
  visitDate,
  unprocesedDicomFilePath
) => {
  const dicomDataPath = processDicomData(unprocesedDicomFilePath);
  const user = new UserModel({
    name,
    email,
    secret,
    dicomDataPath,
    visitDate,
  });
  await user.save();
  mailService.sendLoginEmail(
    user.email,
    user.name,
    user.visitDate,
    generateLoginLink(user)
  );
  return user;
};

const getUser = (id) => UserModel.findById(id).exec();

const deleteUser = (id) => UserModel.findByIdAndDelete(id).exec();

const deleteExpiredUsers = async () => {
  const deleted = await UserModel.deleteMany()
    .where("expirationDate")
    .lte(Date.now())
    .exec();
  console.log(`Deleted ${deleted.deletedCount} expired users`);
};

export default {
  createUser,
  getUser,
  deleteUser,
  deleteExpiredUsers,
};
