import express from "express";
import * as auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth.isAdmin, (req, res, next) => {
  // TODO: Create user
  next();
});

router.delete("/:userId", auth.isAdmin, (req, res, next) => {
  // TODO: Delete user
  next();
});

router.post("/current", (req, res, next) => {
  // TODO: Login
  next();
});

router.get("/current", auth.isUser, (req, res, next) => {
  // TODO: Get data about current user
  next();
});

router.delete("/current", auth.isUser, (req, res, next) => {
  // TODO: Delete the current user
  next();
});

router.get("/current/data", auth.isUser, (req, res, next) => {
  // TODO: Get data of the current user
  next();
});

export default router;
