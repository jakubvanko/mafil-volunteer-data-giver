import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/",
  auth.check(auth.isAdmin),
  multer().single("file"),
  userController.createUser
);

router.get(
  "/:userId",
  auth.check(auth.isAdmin, auth.isUserFromParam("userId")),
  userController.getUserFromParam("userId")
);

router.delete(
  "/:userId",
  auth.check(auth.isAdmin, auth.isUserFromParam("userId")),
  userController.deleteUserFromParam("userId")
);

router.post(
  "/:userId/token",
  auth.check(auth.isValidUserLogin),
  userController.generateLoginToken
);

router.get(
  "/:userId/data",
  auth.check(auth.isUserFromParam("userId")),
  userController.getUserData
);

export default router;
