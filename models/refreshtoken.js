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
  };
  RefreshToken.init({
    userId: DataTypes.STRING,
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

// schema.virtual('isExpired').get(function () {
//   return Date.now() >= this.expires;
// });

// schema.virtual('isActive').get(function () {
//   return !this.revoked && !this.isExpired;
// });