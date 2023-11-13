const { Router } = require("express");
const groupController = require("../controllers/group.controller");
const { createGroupFromReq } = require("../controllers/group.controller");

const postGroupUserFromReq = Router();

postGroupUserFromReq
  .route("/")
  .post(groupController.createGroupFromReq)
  .get(groupController.getAllGroups);

module.exports = postGroupUserFromReq;
