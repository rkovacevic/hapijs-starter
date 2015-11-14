var Sequelize = require('sequelize')
var bcrypt = require('bcrypt')

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
        },
        scope: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            hashPassword: function(password, done) {
                return bcrypt.genSalt(10, function(err, salt) {
                    return bcrypt.hash(password, salt, function(error, encrypted) {
                        this.salt = salt
                        return done(encrypted)
                    })
                })
            }
        },
        instanceMethods: {
            verifyPassword: function(password, done) {
                return bcrypt.compare(password, this.password, function(err, res) {
                    return done(res)
                })
            }
        }
    })

    return User
}