import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", auth.check(auth.isAdmin), userController.createUser);

router.post(
  "/tokens",
  auth.check(auth.isValidUserLogin),
  userController.generateUserToken
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

router.put(
  "/:userId/data",
  auth.check(auth.isAdmin),
  multer().array("files"),
  userController.processDicomDataFromParam("userId", "files")
);

router.post(
  // using POST because XHR does not support native downloads
  "/:userId/data",
  auth.check(auth.isUserFromParam("userId")),
  userController.getUserData
);

router.get(
  "/study/:studyInstance",
  auth.check(auth.isAdmin),
  userController.getUsersByStudyInstanceFromParam("studyInstance")
);

export default router;
