import http from "http";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
// Handle async errors without try and catch blocks => import "express-async-errors"
import userRouter from "./routes/userRouter.js";

dotenv.config();

mongoose.connect(process.env.DATABASE_URI, {}, (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB!!!");
});

const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors()); // Set origin for better security
app.use(helmet());
app.use(express.json()); // If form objects needed => app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", userRouter);

// Default route
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

http.createServer(app).listen(process.env.PORT || "3000");
