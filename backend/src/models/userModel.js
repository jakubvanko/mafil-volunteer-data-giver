import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import ms from "ms";

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("secret")) return;
  this.secret = await bcrypt.hash(
    process.env.HASH_PEPPER + this.secret,
    await bcrypt.genSalt(process.env.SALT_WORK_FACTOR)
  );
});

userSchema.methods.validateSecret = async function (data) {
  return bcrypt.compare(data, process.env.HASH_PEPPER + this.secret);
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

export default mongoose.model("User", userSchema);
