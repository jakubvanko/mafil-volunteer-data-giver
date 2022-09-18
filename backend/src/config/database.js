import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_URI, {}, (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB...");
});
