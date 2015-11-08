var Sequelize = require('sequelize')

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [5, 100]
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        instanceMethods: {
            bla: function() {

            }
        }
    })

    return User
}