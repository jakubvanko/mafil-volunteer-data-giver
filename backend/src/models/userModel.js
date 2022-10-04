import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import ms from "ms";
import bcrypt from "bcryptjs";
import fs from "fs-extra";
import util from "util";
import archiver from "archiver";
import { exec } from "child_process";
import apiService from "../services/apiService.js";

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
  secret: {
    type: String,
    required: true,
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
  dicomDataPath: {
    type: String,
    required: false,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("secret")) return;
  this.secret = await bcrypt.hash(
    process.env.HASH_PEPPER + this.secret,
    await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR))
  );
});

userSchema.pre("save", async function () {
  if (!this.isNew) return;
  try {
    await this.requestDicomData();
  } catch {}
});

userSchema.statics.promiseFindById = function (id) {
  return this.findById(id).exec();
};

userSchema.statics.promiseDeleteById = function (id) {
  return this.findByIdAndDelete(id).exec();
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

userSchema.methods.validateSecret = async function (data) {
  return bcrypt.compare(process.env.HASH_PEPPER + data, this.secret);
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
  this.save();
};

export default mongoose.model("User", userSchema);
