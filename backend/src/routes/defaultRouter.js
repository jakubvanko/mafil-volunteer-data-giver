import express from "express";

const router = express.Router();

// Default route
router.use((req, res, next) => {
  next(createError(404));
});

// Error handler
router.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default router;
