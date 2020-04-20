'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Records', 'UserID', { 
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id', 
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Records', 'UserID')
  }
};
