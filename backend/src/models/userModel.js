import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import ms from "ms";
import bcrypt from "bcryptjs";
import fs from "fs";

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
  expirationDate: {
    type: Date,
    required: true,
    default: new Date(Date.now() + ms(process.env.LOGIN_TOKEN_EXPIRATION)),
  },
  dicomDataPath: {
    type: String,
    required: false,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  studyInstanceUID: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("secret")) return;
  this.secret = await bcrypt.hash(
    process.env.HASH_PEPPER + this.secret,
    await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR))
  );
});

userSchema.methods.validateSecret = async function (data) {
  return bcrypt.compare(process.env.HASH_PEPPER + data, this.secret);
};

userSchema.methods.generateUserToken = function () {
  return jsonwebtoken.sign({ _id: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.USER_TOKEN_EXPIRATION,
  });
};

userSchema.methods.generateLoginToken = function () {
  return jsonwebtoken.sign({ _id: this._id }, process.env.LOGIN_TOKEN_SECRET, {
    expiresIn: process.env.LOGIN_TOKEN_EXPIRATION,
  });
};

userSchema.methods.getDataPackageSize = async function () {
  return (
    (await fs.promises.stat(this.dicomDataPath)).size / (1024 * 1024 * 1024)
  );
};

userSchema.methods.createDataPackage = async function (files) {
  throw new Error("userSchema.methods.createDataPackage: Not implemented");
};

userSchema.statics.deleteExpiredAccounts = async function () {
  return (
    await this.deleteMany().where("expirationDate").lte(Date.now()).exec()
  ).deletedCount;
};

userSchema.statics.promiseFindById = function (id) {
  return this.findById(id).exec();
};

userSchema.statics.promiseDeleteById = function (id) {
  return this.findByIdAndDelete(id).exec();
};

userSchema.statics.findByStudyInstanceUID = function (studyInstanceUID) {
  return this.find({ studyInstanceUID }, "_id").exec();
};

export default mongoose.model("User", userSchema);
