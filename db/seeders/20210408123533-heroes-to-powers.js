'use strict';

const hero_to_power = [
  {
    hero_id: 1,
    power_id :2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    hero_id: 3,
    power_id :2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    hero_id: 2,
    power_id :3,
    created_at: new Date(),
    updated_at: new Date()
  }
];
module.exports = {
  up: async (queryInterface, Sequelize) => 
  await queryInterface.bulkInsert('heroes_to_powers', hero_to_power, {}),

  down: async (queryInterface, Sequelize) =>
    await queryInterface.bulkDelete('heroes_to_powers', null, {})
};
