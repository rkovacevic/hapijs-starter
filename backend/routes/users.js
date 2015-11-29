var models = require('../models')
var Boom = require('Boom')

module.exports = [{
    method: 'GET',
    path: '/api/users/me',
    config: {
        handler: function(request, reply) {
            reply(request.auth.credentials)
        }
    }
}, {
    method: 'POST',
    path: '/api/users',
    config: {
        auth: false,
        handler: function(request, reply) {
            var user = request.payload
            user.scope = 'user'
            models.User.hashPassword(user.password, (encrypted) => {
                user.password = encrypted
                models.User.create(user)
                .then(user => {
                    delete user.dataValues.password
                    reply(user)
                })
                .catch(error => {
                    var response = Boom.badData('Validation failed')
                    response.output.payload.validationErrors = error.errors
                    reply(response)
                })
            })
        }
    }
}, {
    method: 'POST',
    path: '/api/users/login',
    config: {
        auth: false,
        handler: function(request, reply) {
            models.User.findOne({
                where: {
                    username: request.payload.username
                }
            })
            .then(user => {
                user.verifyPassword(request.payload.password, (valid) => {
                    if (valid) {
                        request.auth.session.set(user)
                        delete user.dataValues.password
                        return reply(user)
                    } else {
                        return reply(Boom.unauthorized('Bad credentials'))
                    }
                })
            })
            .catch(() => {
                return reply(Boom.unauthorized('Bad credentials'))
            })
        }
    }
}, {
    method: 'GET',
    path: '/api/users/logout',
    config: {
        handler: function(request, reply) {
            request.auth.session.clear()
            return reply('Logged out')
        }
    }
}]
