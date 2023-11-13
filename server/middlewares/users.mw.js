const { User } = require("../models");
const createError = require("http-errors");

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const userInstance = await User.findByPk(userId);
    if (!userInstance) {
      return next(createError(404, "User not exists"));
    }
    req.userInstance = userInstance;
    next();
  } catch (error) {
    next(error);
  }
};
