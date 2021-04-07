'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuperheroImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SuperheroImage.belongsTo(models.Superhero, {
        foreignKey: 'heroId'
      });
    }
  };
  SuperheroImage.init({
    allowNull: false,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SuperheroImage',
    tableName: 'superhero_images',
    underscored: true
  });
  return SuperheroImage;
};