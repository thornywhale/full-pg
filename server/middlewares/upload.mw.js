const path = require("path");
const multer = require("multer");

const { PATH_IMAGES } = require("../constants");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, `../${PATH_IMAGES}`));
  },
  filename: (req, file, cb) => {
    const uniqueFilename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 99) +
      "-" +
      file.originalname;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports.singleUploader = (name) => upload.single(name);
