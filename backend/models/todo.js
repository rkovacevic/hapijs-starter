module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define('Todo', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 1000]
            }
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Todo.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false
                    }
                })
            }
        }
    })

    return Todo
}
