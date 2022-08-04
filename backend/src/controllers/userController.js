import createError from "http-errors";
import { User } from "../models/user.js";

const processUserData = async (visitDate, unprocessedVisitData) => {
  throw new Error("processUserData: Not implemented");
};

const generateHash = async (secret) => {
  throw new Error("generateHash: Not implemented");
};

const generateExpirationDate = () => {
  throw new Error("generateExpirationDate: Not implemented");
};

const sendLoginLinkEmail = () => {
  throw new Error("sendLoginLinkEmail: Not implemented");
};

export const createUser = async (
  email,
  secret,
  visitDate,
  unprocessedVisitData
) => {
  const visitDataPath = await processUserData(visitDate, unprocessedVisitData);
  const { hash, salt } = await generateHash(secret);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email,
    secret: hash,
    salt,
    expirationDate: generateExpirationDate(),
    visitDataPath,
    visitDate,
  });
  await user.save();
  sendLoginLinkEmail();
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id).exec();
};

export const generateLoginToken = async (id) => {
  throw new Error("generateLoginToken: Not implemented");
};

export const validateSecret = (secret, hash, salt) => {
  throw new Error("validateSecret: Not implemented");
};

export const getUser = async (id) => {
  const user = await User.findById(id).exec();
  if (user === null) {
    throw createError(404);
  }
  return user;
};
