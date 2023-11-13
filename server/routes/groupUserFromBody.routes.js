const { Router } = require("express");
const {
  createGroupFromBody,
  addUserToGroupV1,
  addImage,
} = require("../controllers/group.controller");
const { singleUploader } = require("../middlewares/upload.mw");

// const upload = multer({ dest: path.resolve(__dirname, "../public/images") });

const postGroupUserFromBody = Router();


postGroupUserFromBody
  .route("/")
  .post(singleUploader("image"), createGroupFromBody);

postGroupUserFromBody.route("/:groupId").post(addUserToGroupV1);

postGroupUserFromBody.patch(
  "/:groupId/image",
  singleUploader("image"),
  addImage
);

module.exports = postGroupUserFromBody;
