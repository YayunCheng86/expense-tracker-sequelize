'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Records', 'date', {
        type: Sequelize.DATEONLY,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Records', 'date', {
      type: Sequelize.STRING,
    })
  }
};
