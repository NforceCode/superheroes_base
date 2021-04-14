'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('superheroes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
          isAlphanumeric: true
        }
      },
      realName: {
        field: 'real_name',
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true
        }
      },
      originDescription: {
        field: 'origin_description',
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
          notNull: true,
          notEmpty: true,
          isAlphanumeric: true
        }
      },
      catchPhrase: {
        field: 'catch_phrase',
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
          notNull: true,
          notEmpty: true,
          isAlphanumeric: true
        }
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('superheroes');
  }
};