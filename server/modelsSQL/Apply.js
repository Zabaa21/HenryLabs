const {ENUM, STRING, Sequelize} = require('sequelize')

module.exports = (sequelize) => {

    const Apply = sequelize.define('apply', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
          },
        jobId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        english: {
          type: STRING(500),
        },
        webProfile: {
          type: STRING(500),
        },
        state: {
            type: ENUM({
              values: ['Activo', 'Finalizado'],
            }),
            defaultValue: 'Activo'
          },
        others: {
          type: STRING(500),
        }
    })
    return Apply
}