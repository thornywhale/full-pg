const { Router } = require("express");
const UserController = require("../controllers/user.controller");

const { checkUser } = require("../middlewares/users.mw");
const pagination = require("../middlewares/pagination.mw");

const userRouter = Router();

userRouter.route("/").post(UserController.createUser);
userRouter.get("/:userId", checkUser, UserController.getUserInstance);
userRouter.get("/", UserController.getAllUsers);
userRouter.get("/", pagination, UserController.getUsersPagination);
userRouter.patch("/", UserController.updateUserStatic);
userRouter.patch("/:userId", checkUser, UserController.updateUserInstance);
userRouter.delete("/", UserController.deleteUserStatic);
userRouter.delete("/:userId", checkUser, UserController.deleteUserInstance);

module.exports = userRouter;
