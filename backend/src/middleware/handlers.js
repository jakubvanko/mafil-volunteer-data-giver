import createError from "http-errors";
import Log from "../models/logModel.js";

const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV === "development") console.log(error);
  if (error.status === undefined) {
    Log.createLog({
      eventType: "ERROR",
      eventName: "UNSPECIFIED_ERROR",
      message: `Error handler reached`,
      details: {
        error: error.message,
      },
    });
    error = createError(500);
  }
  res.status(error.status);
  res.json({
    error: {
      message: error.message,
    },
  });
};

const defaultRoute = (req, res, next) => {
  next(createError(404));
};

export default {
  errorHandler,
  defaultRoute,
};
