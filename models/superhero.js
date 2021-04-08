'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Superhero.belongsToMany(models.Superpower, {
        through: 'heroes_to_powers',
        foreignKey: 'heroId'
      });
      Superhero.hasMany(models.SuperheroImage, {
        foreignKey: 'heroId'
      });
    }
  }
  Superhero.init(
    {
      nickname: { 
        allowNull: false,
        type: DataTypes.STRING ,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      realName: {
        field: 'real_name',
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      originDescription: {
        allowNull: false,
        field: 'origin_description',
        type: DataTypes.TEXT,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      catchPhrase: { 
        allowNull: false,
        field: 'catch_phrase',
        type: DataTypes.TEXT ,
        validate: {
          notNull: true,
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      modelName: 'Superhero',
      tableName: 'superheroes',
      underscored: true
    }
  );
  return Superhero;
};
