import express from "express";
import multer from "multer";
import * as auth from "../middleware/auth.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

// Create a new user
router.post("/", auth.isAdmin, multer().single("file"), async (req, res) => {
  const { email, secret, visitDate } = req.body;
  const userId = userController.createUser(
    email,
    secret,
    visitDate,
    req.file.path
  );
  return res.status(200).json({ id: userId });
});

// Delete a user by id
router.delete("/:userId", auth.isAdmin, async (req, res) => {
  await userController.deleteUser(req.params.userId);
  return res.status(204).json();
});

// Perform user login
router.post("/current", auth.isValidUserLogin, async (req, res) => {
  const token = await userController.generateLoginToken(req.auth.user._id);
  return res.status(200).json({ token });
});

// Get user data of the authorized user
router.get("/current", auth.isUser, (req, res) => {
  const { _id, expirationDate, visitDate } = req.auth.user;
  return res.status(200).json({
    id: _id,
    expirationDate,
    visitDate,
  });
});

// Delete the authorized user
router.delete("/current", auth.isUser, async (req, res) => {
  await userController.deleteUser(req.auth.user._id);
  return res.status(204).json();
});

// Get medical data of the authorized user
router.get("/current/data", auth.isUser, (req, res) => {
  const { visitDataPath } = req.auth.user;
  return res.status(200).sendFile(visitDataPath);
});

export default router;
