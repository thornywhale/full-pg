"use strict";
const { isBefore } = require("date-fns");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: "userId",
      });
      // User.hasOne(models.Blog, {
      //   foreignKey: "author",
      // });
      User.belongsToMany(models.Group, {
        through: "users_to_groups",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      avatar: {
        type: DataTypes.TEXT,
      },
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: "first_name",
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      lastName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: "last_name",
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          notNull: true,
          isEmail: true,
        },
      },
      password: {
        field: "password_hash",
        type: DataTypes.TEXT,
        allowNull: false,
        set(value) {
          this.setDataValue("password", "new_hash_password");
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isValidDate(value) {
            if (isBefore(new Date(), new Date(value))) {
              throw new Error("check birthday");
            } // new Date() depends on non-current date, but on date of model creation
          },
          isAfter: "1900-01-01",
        },
      },
      isMale: {
        field: "is_male",
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};
