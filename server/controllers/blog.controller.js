const { Blog } = require("../models");

module.exports.createBlog = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const blog = await userInstance.createBlog(body);
    res.status(201).send({ data: blog });
  } catch (error) {
    next(error);
  }
};

module.exports.getBlog = async (req, res, next) => {
  try {
    const { blogInstance } = req;
    res.status(200).send({ data: blogInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.updateBlog = async (req, res, next) => {
  try {
    const {
      body,
      // params: { blogId },
    } = req;
    const updatedBlog = await blogInstance.update(body);
    res.status(200).send({ data: updatedBlog });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req;
    const blog = Blog.findAll({
      where: {
        author: blogId,
      },
    });
    await blog.destroy();
    res.status(200).send({ data: "Deleted" });
  } catch (error) {
    next(error);
  }
};
