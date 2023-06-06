'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        first_name : "farhan",
        last_name : "chan",
        birthdate : "2004/05/05",
        email: "farhan@gmail.com",
        password: "12345",
        role: "admin",
        is_admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {})
  }
};
