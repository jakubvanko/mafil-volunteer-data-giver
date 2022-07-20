import express from "express";
import multer from "multer";
import * as auth from "../middleware/auth.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/",
  auth.isAdmin,
  multer().single("file"),
  async (req, res, next) => {
    const { email, secret, visitDate } = req.body;
    userController.createUser(email, secret, visitDate, req.file.path);
    return res.status(201).json();
  }
);

router.delete("/:userId", auth.isAdmin, async (req, res, next) => {
  await userController.deleteUser(req.params.userId);
  return res.status(201).json();
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
  return res.status(204).json();
});

router.get("/current/data", auth.isUser, (req, res, next) => {
  const { visitDataPath } = req.auth.user;
  return res.status(200).sendFile(visitDataPath);
});

export default router;
