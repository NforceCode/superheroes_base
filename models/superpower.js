'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superpower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Superpower.belongsTo(models.Superhero, {
        foreignKey: 'heroId'
      });
    }
  };
  Superpower.init({
    allowNull: false,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Superpower',
    tableName: 'superpowers',
    underscored: true
  });
  return Superpower;
};