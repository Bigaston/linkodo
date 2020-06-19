'use strict';
module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('Link', {
    short: DataTypes.STRING,
    long: DataTypes.STRING,
    nb: DataTypes.INTEGER
  }, {});
  Link.associate = function(models) {
  };
  return Link;
};