import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import ms from "ms";
import bcrypt from "bcryptjs";
import fs from "fs-extra";
import util from "util";
import archiver from "archiver";
import crypto from "crypto";
import { exec } from "child_process";
import apiService from "../services/apiService.js";
import mailService from "../services/mailService.js";

const promiseExec = util.promisify(exec);

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /\+\d+/,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  studyInstanceUID: {
    type: String,
    required: true,
  },
  dicomDataType: {
    type: String,
    required: true,
    default: "ANATOMICAL",
  },
  expirationDate: {
    type: Date,
    required: true,
    default: () =>
      new Date(Date.now() + ms(process.env.EMAIL_TOKEN_EXPIRATION)),
  },
  shouldSendReminder: {
    type: Boolean,
    required: true,
    default: true,
  },
  dicomDataPath: {
    type: String,
    required: false,
  },
  secret: {
    type: String,
    required: false,
  },
  secretExpirationDate: {
    type: Date,
    required: false,
    default: new Date(Date.now()),
  },
  secretTryAmount: {
    type: Number,
    required: false,
    default: 0,
  },
  leftSMSAmount: {
    type: Number,
    required: true,
    default: process.env.SMS_MAX_AMOUNT,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("secret")) return;
  this.secret = await bcrypt.hash(
    process.env.HASH_PEPPER + this.secret,
    await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR))
  );
  this.secretExpirationDate = new Date(
    Date.now() + ms(process.env.SECRET_EXPIRATION)
  );
  this.secretTryAmount = process.env.SECRET_TRY_AMOUNT;
});

userSchema.pre("save", async function () {
  if (!this.isNew) return;
  try {
    await this.requestDicomData();
  } catch {}
});

userSchema.pre("deleteMany", async function () {
  for (const deletedUser of await this.model.find(this._conditions).exec()) {
    await deletedUser.deleteArchive();
  }
});

userSchema.statics.promiseFindById = function (id) {
  return this.findById(id).exec();
};

userSchema.statics.promiseDeleteById = function (id) {
  return this.deleteMany({ _id: id }).exec(); // uses deleteMany because of a deleteMany hook!
};

userSchema.statics.findByStudyInstanceUID = function (studyInstanceUID) {
  return this.find({ studyInstanceUID }, "_id").exec();
};

userSchema.statics.deleteExpiredAccounts = async function () {
  return (
    await this.deleteMany().where("expirationDate").lte(Date.now()).exec()
  ).deletedCount;
};

userSchema.statics.requestDataForUnactivatedAccounts = async function () {
  for (const user of await this.find({
    dicomDataPath: { $exists: false },
  }).exec()) {
    await user.requestDicomData();
  }
};

userSchema.statics.remindUsers = async function () {
  for (const user of await this.find({
    expirationDate: {
      $lte: new Date(
        Date.now() + ms(process.env.REMINDER_TIME_BEFORE_EXPIRATION)
      ),
    },
    shouldSendReminder: true,
    dicomDataPath: { $exists: true },
  }).exec()) {
    await user.sendReminder();
  }
};

userSchema.methods.validateSecret = async function (data) {
  if (new Date(Date.now()) >= this.secretExpirationDate) {
    return false;
  }
  if (this.secretTryAmount <= 0) {
    return false;
  }
  if (await bcrypt.compare(process.env.HASH_PEPPER + data, this.secret)) {
    this.secretExpirationDate = new Date(Date.now());
    await this.save();
    return true;
  }
  this.secretTryAmount -= 1;
  await this.save();
  return false;
};

userSchema.methods.generateUserToken = function () {
  return jsonwebtoken.sign({ _id: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.USER_TOKEN_EXPIRATION,
  });
};

userSchema.methods.generateEmailToken = function () {
  return jsonwebtoken.sign({ _id: this._id }, process.env.EMAIL_TOKEN_SECRET, {
    expiresIn: process.env.EMAIL_TOKEN_EXPIRATION,
  });
};

userSchema.methods.getDataPackageSize = async function () {
  return (await fs.stat(this.dicomDataPath)).size / (1024 * 1024 * 1024);
};

userSchema.methods.generateLoginLink = function () {
  return process.env.LOGIN_URL + this.generateEmailToken();
};

userSchema.methods.requestDicomData = async function () {
  return await apiService.requestDicomData(
    this.studyInstanceUID,
    this.dicomDataType
  );
};

userSchema.methods.createDataPackage = async function () {
  await this.deleteArchive(); // if archive already exists for some reason
  const folderToZip = `tmp/${this._id}`;
  const archiveStoragePath = "./archives/";
  const userArchivePath = `${archiveStoragePath}${this.name.replace(
    " ",
    "_"
  )}_${this.id}.zip`;
  await fs.ensureDir(archiveStoragePath);
  await promiseExec(`dcmmkdir --recurse`, {
    cwd: folderToZip + "/data",
  });
  await fs.copy("dicom_viewer/program", folderToZip + "/data");
  await fs.copy("dicom_viewer/startup_script", folderToZip);
  const output = fs.createWriteStream(userArchivePath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  archive.pipe(output);
  archive.directory(folderToZip, false);
  await archive.finalize();
  await fs.remove(folderToZip);
  this.dicomDataPath = userArchivePath;
  await this.save();
};

userSchema.methods.sendReminder = async function () {
  await mailService.sendLoginEmail(
    this.email,
    this.name,
    this.visitDate,
    this.expirationDate,
    this.generateLoginLink(),
    true
  );
  this.shouldSendReminder = false;
  await this.save();
};

userSchema.methods.activateAccount = async function () {
  await this.createDataPackage();
  await mailService.sendLoginEmail(
    this.email,
    this.name,
    this.visitDate,
    this.expirationDate,
    this.generateLoginLink(),
    false
  );
};

userSchema.methods.sendLoginCode = async function () {
  if (this.leftSMSAmount <= 0) {
    return false;
  }
  if (new Date(Date.now()) < this.secretExpirationDate) {
    return false;
  }
  const generatedSecret = crypto
    .randomBytes(parseInt(process.env.SECRET_BYTE_SIZE))
    .toString("hex")
    .toUpperCase();
  this.secret = generatedSecret;
  this.leftSMSAmount -= 1;
  await this.save();
  await apiService.sendSMS(
    this.phoneNumber,
    `Váš MAFIL kód je: ${generatedSecret}\nYour MAFIL code is: ${generatedSecret}`
  );
  return true;
};

userSchema.methods.deleteArchive = async function () {
  if (this.dicomDataPath !== undefined) {
    await fs.remove(this.dicomDataPath);
    this.dicomDataPath = undefined;
    await this.save();
  }
};

export default mongoose.model("User", userSchema);
