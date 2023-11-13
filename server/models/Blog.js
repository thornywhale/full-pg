"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      // Blog.hasOne(models.User, {
      //   foreignKey: "author",
      // });
    }
  }
  Blog.init(
    {
      theme: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      rating: {
        type: DataTypes.NUMERIC(4, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
          isValidNumber(value) {
            if (value < 0) {
              throw new Error("invalid rating");
            }
          },
        },
      },
      isTrending: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_trending",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Blog",
      tableName: "blogs",
      underscored: true,
    }
  );
  return Blog;
};
