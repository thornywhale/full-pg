const ApplicationError = require("./ApplicationError");

class TaskLimitError extends ApplicationError {
  constructor(message) {
    super(403, message || "Task limit reached");
  }
}

module.exports = TaskLimitError;
