'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    date: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    merchant: DataTypes.STRING
  }, {});

  Record.associate = function(models) {
    Record.belongsTo(models.User)
  }
  
  return Record;
};