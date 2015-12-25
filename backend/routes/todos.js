var models = require('../models')
var Boom = require('boom')
var Joi = require('joi')


module.exports = [{
    method: 'GET',
    path: '/api/users/{userId}/todos',
    config: {
        tags: ['api'],
        validate: {
            params: {
                userId: Joi.number().integer().required()
            }
        },
        handler: function(request, reply) {
            console.log(1)
            models.Todo.findAll({
                where: {
                    userId: request.params.userId
                },
                raw: true
            })
            .then(reply)
            .catch((err) => {
                console.dir(err)
                reply(err)
            })
        }
    }
}, {
    method: 'POST',
    path: '/api/users/{userId}/todos',
    config: {
        tags: ['api'],
        validate: {
            params: {
                userId: Joi.number().integer().required()
            },
            payload: {
                text: Joi.string().min(1).max(1000).required(),
                done: Joi.boolean()
            }
        },
        handler: function(request, reply) {
            var todo = request.payload
            todo.UserId = parseInt(request.params.userId, 10)
            models.Todo.create(todo)
            .then(reply)
            .catch(reply)
        }
    }
}, {
    method: 'PUT',
    path: '/api/users/{userId}/todos/{todoId}',
    config: {
        tags: ['api'],
        validate: {
            params: {
                userId: Joi.number().integer().required(),
                todoId: Joi.number().integer().required()
            },
            payload: {
                text: Joi.string().min(1).max(1000).required(),
                done: Joi.boolean(),
                id: Joi.number().required(),
                createdAt: Joi.date().required(),
                updatedAt: Joi.date().required(),
                UserId: Joi.number().required()
            }
        },
        handler: function(request, reply) {
            models.Todo.update(
                request.payload,
                {
                    where: {
                        UserId: request.params.userId,
                        id: request.params.todoId
                    }
                }
            )
            .then(reply)
            .catch(reply)
        }
    }
}, {
    method: 'DELETE',
    path: '/api/users/{userId}/todos/{todoId}',
    config: {
        tags: ['api'],
        validate: {
            params: {
                userId: Joi.number().integer().required(),
                todoId: Joi.number().integer().required()
            }
        },
        handler: function(request, reply) {
            models.Todo.destroy({
                where: {
                    userId: request.params.userId,
                    id: request.params.todoId
                }
            })
            .then(result => {
                if (result > 0) reply({nessage: 'Deleted'})
                else reply(Boom.notFound())
            })
            .catch(reply)
        }
    }
}]
