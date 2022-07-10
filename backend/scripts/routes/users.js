import express from "express";

const router = express.Router();

router.post("/", (req, res, next) => {
  // TODO: Create user (admin)
  next();
});

router.delete("/:userId", (req, res, next) => {
  // TODO: Delete user (admin)
  next();
});

router.post("/current", (req, res, next) => {
  // TODO: Login
  next();
});

router.get("/current", (req, res, next) => {
  // TODO: Get data about current user (auth)
  next();
});

router.delete("/current", (req, res, next) => {
  // TODO: Delete the current user (auth)
  next();
});

router.get("/current/data", (req, res, next) => {
  // TODO: Get data of the current user (auth)
  next();
});

export default router;
