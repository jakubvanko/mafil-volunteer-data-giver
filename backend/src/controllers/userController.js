import UserModel from "../models/userModel.js";
import Log from "../models/logModel.js";

const createUser = async (req, res) => {
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    visitDate: req.body.visitDate,
    studyInstanceUID: req.body.studyInstanceUID,
    dicomDataType: req.body.dicomDataType,
  });
  await user.save();
  res.status(201).json({ id: user._id });
  return Log.createLog({
    eventType: "SERVICE_REQUEST",
    eventName: "ACCOUNT_CREATED",
    message:
      "A new volunteer account was created (but it is not activated yet)",
    details: {
      account_id: user._id.toString(),
    },
  });
};

const getUserFromParam = (param) => async (req, res) => {
  const user =
    req.auth?.user?._id === req.params[param]
      ? req.auth.user
      : await UserModel.promiseFindById(req.params[param]);
  res.status(200).json({
    id: user._id,
    expirationDate: user.expirationDate,
    visitDate: user.visitDate,
    dataSize: await user.getDataPackageSize(),
  });
  return Log.createLog({
    eventType:
      req.auth?.user === undefined ? "SERVICE_REQUEST" : "USER_REQUEST",
    eventName: "ACCOUNT_DETAILS_REQUESTED",
    message: "Details of a volunteer account were requested",
    details: {
      account_id: user._id,
    },
  });
};

const deleteUserFromParam = (param) => async (req, res) => {
  await UserModel.promiseDeleteById(req.params[param]);
  res.status(204).json();
  return Log.createLog({
    eventType:
      req.auth?.user === undefined ? "SERVICE_REQUEST" : "USER_REQUEST",
    eventName: "ACCOUNT_DELETED",
    message: "A volunteer account was deleted",
    details: {
      account_id: req.params[param],
    },
  });
};

const getLoginDetails = async (req, res) => {
  res.status(200).json({
    leftSMSAmount: req.auth.user.leftSMSAmount,
    secretExpirationDate: req.auth.user.secretExpirationDate,
    secretTryAmount: req.auth.user.secretTryAmount,
  });
  return Log.createLog({
    eventType: "USER_REQUEST",
    eventName: "LOGIN_DETAILS_REQUESTED",
    message: `Login details of an account were requested`,
    details: {
      account_id: req.auth.user._id,
    },
  });
};

const sendLoginCode = async (req, res) => {
  if (await req.auth.user.sendLoginCode()) {
    res.status(204).json();
    return Log.createLog({
      eventType: "USER_REQUEST",
      eventName: "LOGIN_SECRET_REQUESTED",
      message: "A login secret was created and sent to the volunteer",
      details: {
        account_id: req.auth.user._id,
      },
    });
  } else {
    res.status(429).json();
    return Log.createLog({
      eventType: "USER_REQUEST",
      eventName: "LOGIN_SECRET_REQUEST_DENIED",
      message: "A login secret creation was denied",
      details: {
        account_id: req.auth.user._id,
      },
    });
  }
};

const generateUserToken = (req, res) => {
  res
    .status(200)
    .json({ id: req.auth.user._id, token: req.auth.user.generateUserToken() });
  return Log.createLog({
    eventType: "USER_REQUEST",
    eventName: "ACCOUNT_LOGIN",
    message: "A login to a volunteer account was performed",
    details: {
      account_id: req.auth.user._id,
    },
  });
};

const getUserData = async (req, res) => {
  res.status(200).download(req.auth.user.dicomDataPath);
  req.auth.user.shouldSendReminder = false;
  await req.auth.user.save();
  return Log.createLog({
    eventType: "USER_REQUEST",
    eventName: "ACCOUNT_DATA_DOWNLOADED",
    message: "Download of volunteer's DICOM data was started",
    details: {
      account_id: req.auth.user._id,
    },
  });
};

const processDicomDataFromParam = (userParam) => async (req, res) => {
  const user = await UserModel.promiseFindById(req.params[userParam]);
  await user.activateAccount();
  res.status(204).json();
  return Log.createLog({
    eventType: "SERVICE_REQUEST",
    eventName: "ACCOUNT_ACTIVATED",
    message:
      "A volunteer account data package was created and the account activated",
    details: {
      account_id: req.params[userParam],
    },
  });
};

const getUsersByStudyInstanceFromParam = (param) => async (req, res) => {
  res
    .status(200)
    .json(await UserModel.findByStudyInstanceUID(req.params[param]));
  return Log.createLog({
    eventType: "SERVICE_REQUEST",
    eventName: "ACCOUNTS_BY_STUDY_INSTANCE_REQUESTED",
    message: `Accounts related to a studyInstanceUID ${req.params[param]} were requested`,
    details: {
      study_instance_uid: req.params[param],
    },
  });
};

export default {
  createUser,
  getUserFromParam,
  deleteUserFromParam,
  getLoginDetails,
  sendLoginCode,
  generateUserToken,
  getUserData,
  processDicomDataFromParam,
  getUsersByStudyInstanceFromParam,
};
