import mongoose from "mongoose";

export const User = mongoose.model(
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
    expiration_date: {
      type: Date,
      required: true,
    },
    visit_data_path: {
      type: String,
      required: true,
    },
    visit_date: {
      type: Date,
      required: true,
    },
  })
);
