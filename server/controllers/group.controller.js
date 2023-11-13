const _ = require("lodash");
const createError = require("http-errors");
const { Group, User } = require("../models");
const attrsBody = ["name", "imgPath", "description", "userId"];
const attrsReq = ["name", "imgPath", "description"];

module.exports.createGroupFromBody = async (req, res, next) => {
  try {
    const { body, file } = req;
    let values = _.pick(body, attrsBody);
    if (file) {
      values = { ...values, imgPath: file.filename };
    }
    const user = await User.findByPk(values.userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const group = await Group.create(values);
    if (!group) {
      return next(createError(400, "Bad request"));
    }
    await user.addGroup(group);
    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.createGroupFromReq = async (req, res, next) => {
  try {
    const { userInstance, body } = req;
    const values = _.pick(body, attrsReq);
    const group = await Group.create(values);
    if (!group) {
      return next(createError(400, "Bad request"));
    }
    await userInstance.addGroup(group);
    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroups = async (req, res, next) => {
  try {
    const { userInstance } = req;
    let groups = await userInstance.getGroups();
    groups = groups.forEach(
      ({ dataValues }) => (dataValues["users_to_groups"] = undefined)
    );
    res.status(200).send({ data: groups });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroups = async (req, res, next) => {
  try {
    const { userInstance } = req;
    let groups = await userInstance.getGroups();
    groups = groups.forEach(
      ({ dataValues }) => (dataValues["users_to_groups"] = undefined)
    );
    res.status(200).send({ data: groups });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToGroupV1 = async (req, res, next) => {
  try {
    const {
      params: { groupId },
      body: { userId },
    } = req;
    const user = await User.findByPk(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const group = await Group.findByPk(groupId);
    if (!group) {
      return next(createError(404, "Group not found"));
    }
    await group.addUser(user);
    const groupWithUsers = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.status(201).send({ data: groupWithUsers });
  } catch (error) {
    next(error);
  }
};

// module.exports.addUserToGroupV2 = async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };

module.exports.addImage = async (req, res, next) => {
  try {
    // console.log(req.file.filename);
    const {
      file: { filename },
      params: { groupId },
    } = req;
    const [count, [updatedGroup]] = await Group.update(
      { imgPath: filename },
      {
        where: { id: groupId },
        returning: true,
      }
    );
    if (!updatedGroup) {
      return next(createError(404, "Group not found"));
    }
    res.status(200).send({ data: updatedGroup });
  } catch (error) {
    next(error);
  }
};
