'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('superheroes',{
      type: 'unique',
      fields: ['nickname'],
      name: 'superheroes_nickname_unique'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('superheroes','superheroes_nickname_unique', {
      type: 'unique',
      fields: ['nickname']
    })
  }
};
