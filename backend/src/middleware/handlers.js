const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
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
