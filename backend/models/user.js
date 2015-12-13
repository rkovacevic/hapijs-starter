var bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [5, 20]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        scope: {
            type: DataTypes.STRING,
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
            },
            associate: function(models) {
                User.hasMany(models.Todo)
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
