"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: "users_to_groups",
        foreignKey: "groupId",
      });
    }
  }
  Group.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(64),
        validate: {
          notEmpty: true,
        },
      },
      imgPath: { type: DataTypes.TEXT, field: "field_path" },
      description: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "groups",
      underscored: true,
    }
  );
  return Group;
};
