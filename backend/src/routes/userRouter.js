import express from "express";
import auth from "../middleware/auth.js";
import userController from "../controllers/userController.js";
import fileSaver from "../middleware/fileSaver.js";

const router = express.Router();

router.post("/", auth.check(auth.isAdmin), userController.createUser);

router.get(
  "/secrets",
  auth.check(auth.isValidEmailToken),
  userController.sendLoginCode
);

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
  fileSaver.saveUserFiles("files", "userId", "DICOM"),
  userController.processDicomDataFromParam("userId")
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
