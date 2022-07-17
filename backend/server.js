import http from "http";
import mongoose from "mongoose";
import app from "./scripts/app.js";

mongoose.connect("mongodb://localhost:27017", {}, (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB!!!");
});

const server = http.createServer(app);

server.listen(process.env.PORT || "3000");
