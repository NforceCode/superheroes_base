'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('superhero_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      heroId :{
        field: 'hero_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'superheroes',
          key: 'id'
        },
        OnDelete: 'cascade',
        OnUpdate: 'cascade'
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('superhero_images');
  }
};