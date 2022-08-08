import UserModel from "../models/userModel.js";
import mailService from "./mailService.js";

const processDicomData = (path) => {
  throw new Error("processDicomData: Not implemented");
};

const sendLoginEmail = (user) => {
  return mailService.sendMail(
    user.email,
    "[MAFIL-Dobrovolnik] Váš účet bol vytvorený",
    `<p>${user.generateLoginToken()}</p>`
  );
};

const createUser = async (
  email,
  secret,
  visitDate,
  unprocesedDicomFilePath
) => {
  const dicomDataPath = processDicomData(unprocesedDicomFilePath);
  const user = new UserModel({
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
