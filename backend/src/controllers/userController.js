import createError from "http-errors";
import User from "../models/user.js";

const processUserData = async (visitDate, unprocessedVisitData) => {
  throw new Error("processUserData: Not implemented");
};

const generateHash = async (secret) => {
  throw new Error("generateHash: Not implemented");
};

const generateExpirationDate = () => {
  throw new Error("generateExpirationDate: Not implemented");
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
};

export const deleteUser = async (id) => {
  return User.findByIdAndDelete(id).exec();
};

export const loginUser = async (id, secret) => {
  throw new Error("loginUser: Not implemented");
};

export const getUser = async (id) => {
  const user = await User.findById(id).exec();
  if (user === null) {
    throw createError(404);
  }
  return user;
};
