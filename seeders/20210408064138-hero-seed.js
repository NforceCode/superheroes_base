'use strict';

const { Op } = require('sequelize');

const heroesWeDeserve = [
  {
    nickname: "SuperTester",
    real_name: "Test Testovich",
    origin_description: "He was born on undefined street, and since gained power of NULL",
    catch_phrase: `"I will Null You!"`,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nickname: 'UberMan',
    real_name: 'Feofont Petrov',
    origin_description: 'Shrouded in mystery',
    catch_phrase: `"Uber Power is the only right answer!"`,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nickname: 'BugGrabber',
    real_name: 'Debug Ultimus',
    origin_description: 'Shrouded in mystery',
    catch_phrase: `"No bugs will survive!"`,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    nickname: 'Dr. MadLad',
    real_name: 'Matt Lad',
    origin_description: 'Finished medical univercity... Yep',
    catch_phrase: `"Feel the power of Heal!"`,
    created_at: new Date(),
    updated_at: new Date()
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.bulkInsert('superheroes', heroesWeDeserve, {}),

  down: async (queryInterface, Sequelize) =>
    await queryInterface.bulkDelete('superheroes', {
      nickname : {[Op.in] : heroesWeDeserve.map(hero => hero.nickname)}
    }, {})
};
