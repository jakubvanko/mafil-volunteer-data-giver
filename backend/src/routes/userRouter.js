import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/",
  auth.isAdmin,
  multer().single("file"),
  userController.createUser
);

router.get(
  "/:userId",
  auth.oneOf(auth.isAdmin, auth.isUserFromParam("userId")),
  userController.getUser
);

router.delete(
  "/:userId",
  auth.oneOf(auth.isAdmin, auth.isUserFromParam("userId")),
  userController.deleteUser
);

router.post(
  "/:userId/token",
  auth.isValidUserLogin,
  userController.generateLoginToken
);

router.get(
  "/:userId/data",
  auth.isUserFromParam("userId"),
  userController.getUserData
);

export default router;
