'use strict';

const { Op } = require('sequelize');

const powers = [
  {
    name: 'Can actually understand Sequalize documentation',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Can find bugs in code, that hasn`t been written yet',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'San go to sleep before 1am',
    created_at: new Date(),
    updated_at: new Date()
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.bulkInsert('superpowers', powers, {}),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'superpowers',
      {
        nickname: { [Op.in]: powers.map(hero => hero.nickname) }
      },
      {}
    );
  }
};
