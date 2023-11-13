"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users_to_groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        field: "user_id",
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "groups",
          key: "id",
        },
        field: "group_id",
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users_to_groups");
  },
};
