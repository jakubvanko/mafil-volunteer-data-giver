import dotenv from "dotenv";
dotenv.config();
import http from "http";
import mongoose from "mongoose";
import app from "./src/app.js";

mongoose.connect(process.env.DATABASE_URI, {}, (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB!!!");
});

const server = http.createServer(app);

server.listen(process.env.PORT || "3000");
