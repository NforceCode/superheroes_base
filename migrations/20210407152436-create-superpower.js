'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('superpowers', {
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
      description: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('superpowers');
  }
};