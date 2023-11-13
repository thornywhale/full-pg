const { Router } = require("express");

const TaskController = require("../controllers/task.controller");
const BlogController = require("../controllers/blog.controller");
const { checkUser } = require("../middlewares/users.mw");
const { checkTask, checkOnlyTask } = require("../middlewares/tasks.mw");
const pagination = require("../middlewares/pagination.mw");
const { checkBlog } = require("../middlewares/blogs.mw");
const userRouter = require("./user.routes");
const postGroupUserFromBody = require("./groupUserFromBody.routes");
const postGroupUserFromReq = require("./groupUserFromReq.routes");

const router = Router();

// ----- User methods -----

router.use("/users", userRouter);

// ----- Task methods -----

router.post("/users/:userId/tasks", checkUser, TaskController.createTask);
router.get("/users/:userId/tasks", checkUser, TaskController.getAllTasks);
// router.get(
//   "/users/:userId/tasks",
//   checkUser,
//   pagination,
//   TaskController.getTasksPagination
// );
router.get("/tasks/:taskId", checkOnlyTask, TaskController.getTask);
router.patch(
  "/users/:userId/tasks/:taskId",
  checkUser,
  checkTask,
  TaskController.updateTask
);
router.delete("/tasks/:taskId", checkOnlyTask, TaskController.deleteTask);

// ----- Blog methods -----

// router.post("/users/:userId/blogs", checkUser, BlogController.createBlog);
// router.get(
//   "/users/:userId/blogs",
//   checkUser,
//   checkBlog,
//   BlogController.getBlog
// );
// router.patch(
//   "/users/:userId/blogs/:blogId",
//   checkUser,
//   checkBlog,
//   BlogController.updateBlog
// );
// router.delete("/blogs/:blogId", BlogController.deleteBlog);

// ----- Group methods -----

router.use("/groups", postGroupUserFromBody);
router.use("/users/:userId/groups", checkUser, postGroupUserFromReq);


module.exports = router;
