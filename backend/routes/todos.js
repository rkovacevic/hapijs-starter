var models = require('../models')
var Boom = require('Boom')

module.exports = [{
    method: 'GET',
    path: '/api/users/{userId}/todos',
    config: {
        handler: function(request, reply) {
            models.Todo.findAll({
                where: {
                    userId: request.params.userId
                }
            })
            .then(reply)
            .catch(reply)
        }
    }
}, {
    method: 'POST',
    path: '/api/users/{userId}/todos',
    config: {
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
        handler: function(request, reply) {
            models.Todo.update(
                request.payload,
                {
                    where: {
                        userId: request.params.userId,
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
