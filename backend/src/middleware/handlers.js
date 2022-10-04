import createError from "http-errors";
import Log from "../models/logModel.js";

const errorHandler = (error, req, res, next) => {
  if (error.status === undefined) {
    error = createError(500);
    Log.createLog({
      eventType: "ERROR",
      eventName: "UNSPECIFIED_ERROR",
      message: `Error handler reached`,
      details: {
        error: error.message,
      },
    });
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
