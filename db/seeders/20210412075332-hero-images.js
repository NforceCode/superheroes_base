'use strict';

const { Op } = require('sequelize');

const images = [
  {
    "address": 'testimage.jpg',
    "hero_id" : 1,
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "address": 'testimage2.jpg',
    "hero_id" : 2,
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "address": 'testimage3.jpg',
    "hero_id" : 3,
    "created_at": new Date(),
    "updated_at": new Date()
  },
  
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('superhero_images', images,{});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('superhero_images', {
      address: {[Op.in] : images.map(image => image.address)}
    })
  }
};
