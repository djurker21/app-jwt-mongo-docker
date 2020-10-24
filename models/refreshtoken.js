'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static isExpired() {
      return Date.now() >= this.expires;
    }

    static isActive() {
      return !this.revoked && !this.isExpired;
    }
  };
  RefreshToken.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expires: DataTypes.DATE,
    createdByIp: DataTypes.STRING,
    revoked: DataTypes.DATE,
    revokedByIp: DataTypes.STRING,
    replacedByToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });
  return RefreshToken;
};