import mongoose from "mongoose";
import Log from "../models/logModel.js";

mongoose.connect(process.env.DATABASE_URI, {}, async (err) => {
  if (err) throw err;
  await Log.createLog({
    eventType: "AUTOMATIC",
    eventName: "DATABASE_CONNECTION_ESTABLISHED",
    message: `Connected to MongoDB instance`,
    details: {},
  });
});
