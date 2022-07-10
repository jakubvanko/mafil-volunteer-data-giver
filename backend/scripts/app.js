import express from "express";
import morgan from "morgan";
import createError from "http-errors";
// Handle async errors without try and catch blocks
// consider adding require("express-async-errors");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
// If form objects needed, use: app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

export default app;
