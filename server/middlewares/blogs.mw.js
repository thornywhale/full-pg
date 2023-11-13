const { Blog } = require("../models");

module.exports.checkBlog = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { userId },
    } = req;
    const blog = await userInstance.getBlogs({
      where: { author: userId },
    });
    console.log(blog);
    if (!blog) {
      return res.status(404).send({ data: "User hasnt blog" });
    }
    req.blogInstance = blog;
    next();
  } catch (error) {
    next(error);
  }
};
