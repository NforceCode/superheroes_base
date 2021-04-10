'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('superpowers', {
      type: 'unique',
      fields: ['name'],
      name: 'superpowers_name_unique'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('superpowers','superpowers_name_unique', {
      type: 'unique',
      fields: ['name'],
    })
  }
};
