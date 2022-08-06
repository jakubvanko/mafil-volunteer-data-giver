import mongoose from "mongoose";

export default User = mongoose.model(
  "User",
  mongoose.Schema({
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
    salt: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    visitDataPath: {
      type: String,
      required: true,
    },
    visitDate: {
      type: Date,
      required: true,
    },
  })
);
