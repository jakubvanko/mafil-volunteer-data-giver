import mongoose from "mongoose";

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
    default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // days * hrs * mins * secs * ms
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

userSchema.methods.validateSecret = async function validateSecret(data) {
  return bcrypt.compare(data, process.env.HASH_PEPPER + this.secret);
};

export default UserModel = mongoose.model("User", userSchema);
