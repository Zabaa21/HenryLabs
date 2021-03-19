const { STRING, Sequelize, INTEGER, ENUM } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('migrationRequest', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        status: {
            type: ENUM('pending', 'accepted', 'rejected'),
            defaultValue: 'pending'
        },
        reason: {
            type: STRING(500)
        },
        wishedStartingDate: {
            type: STRING(30)
        }
    });
};
