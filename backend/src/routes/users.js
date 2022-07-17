import express from "express";
import * as auth from "../middleware/auth.js";
import * as userController from "../controllers/userController.js";

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
  const { _id, expirationDate, visitDate } = req.auth.user;
  return res.status(200).json({
    id: _id,
    expirationDate,
    visitDate,
  });
});

router.delete("/current", auth.isUser, async (req, res, next) => {
  await userController.deleteUser(req.auth.user._id);
  return res.status(201).json();
});

router.get("/current/data", auth.isUser, (req, res, next) => {
  const { visitDataPath } = req.auth.user;
  return res.status(200).sendFile(visitDataPath);
});

export default router;
