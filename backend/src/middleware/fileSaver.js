import multer from "multer";
import fs from "fs-extra";

const saveUserFiles = (filesArg, userParam, subfolder) =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const directory = `tmp/${req.params[userParam]}/data/${subfolder}`;
        fs.ensureDirSync(directory);
        cb(null, directory);
      },
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
  }).array(filesArg);

export default {
  saveUserFiles,
};
