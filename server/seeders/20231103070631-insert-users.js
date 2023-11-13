"use strict";

const generateUser = (key) => ({
  first_name: `Name${key}`,
  last_name: `Surname${key}`,
  email: `Email${key}@gmail.com`,
  password_hash: `text${key}abc123`,
  birthday: new Date(1970, key, key),
  is_male: Math.random() > 0.5,
  created_at: new Date(),
  updated_at: new Date(),
});

const generateUsers = (amount = 100) => {
  return new Array(amount).fill(null).map((el, i) => generateUser(i));
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", generateUsers(), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
