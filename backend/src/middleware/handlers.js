import createError from "http-errors";

const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error.status === undefined) {
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
