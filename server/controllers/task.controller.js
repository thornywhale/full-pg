const TaskLimitError = require("../errors/TaskLimitError");
const { Task, User } = require("../models");

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const count = await userInstance.countTasks();
    if (count >= 10) {
      return next(
        new TaskLimitError("Task amount must be less or equal to 10")
      );
    }
    const newTask = await userInstance.createTask(body);
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const tasks = await userInstance.getTasks({
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });
    if (tasks.length === 0) {
      return res.status(204).send(); // 204 doesnt return any data but .send() method is required in response
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const { task } = req;

    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { body, taskInstance } = req;
    const updatedTask = await taskInstance.update(body);
    res.status(200).send({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { task } = req;
    await task.destroy();
    res.status(200).send({ data: "Deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports.getTasksPagination = async (req, res, next) => {
  try {
    const { userInstance, pagination } = req;
    const tasks = await userInstance.getTasks({
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
      ...pagination,
    });
    if (tasks.length === 0) {
      return res.status(204).send();
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};
