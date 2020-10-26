'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static getByUserId(userId, limit, offset) {
        return this.findAndCountAll({where: {userId: userId}, limit, offset});
    }

    static getByCategoryId(CategoryId, limit, offset) {
        return this.findAndCountAll({where: {CategoryId: CategoryId}, limit, offset});
    }
  };
  Fork.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    createdYear: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fork',
  });
  return Fork;
};