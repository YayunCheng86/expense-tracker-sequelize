'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Records', 'merchant', { 
        type: Sequelize.STRING
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Records', 'merchant')
  }
};
