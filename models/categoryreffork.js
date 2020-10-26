'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryRefFork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CategoryRefFork.init({
    categoryId: DataTypes.INTEGER,
    forkId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CategoryRefFork',
  });
  return CategoryRefFork;
};