var models = require('../models')
var Boom = require('boom')
var Joi = require('joi')
var JWT = require('jsonwebtoken')

var cookieOptions = {
    ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
    encoding: 'none',    // we already used JWT to encode
    isSecure: false,      // WARNING: SHOULD BE TRUE ON PRODUCTION!!!
    isHttpOnly: true,    // prevent client alteration
    clearInvalid: false, // remove invalid cookies
    strictHeader: true   // don't allow violations of RFC 6265
}

module.exports = [{
    method: 'GET',
    path: '/api/users/me',
    config: {
        tags: ['api'],
        handler: function(request, reply) {
            reply(request.auth.credentials)
        }
    }
}, {
    method: 'POST',
    path: '/api/users',
    config: {
        tags: ['api'],
        auth: false,
        validate: {
            payload: {
                username: Joi.string().min(5).max(20).required(),
                password: Joi.string().min(5).max(100).required(),
                repeatPassword: Joi.string().min(5).max(100).required()
            }
        },
        handler: function(request, reply) {
            var user = request.payload
            user.scope = 'user'
            models.User.hashPassword(user.password, (encrypted) => {
                user.password = encrypted
                models.User.create(user)
                .then(user => {
                    delete user.dataValues.password
                    var token = JWT.sign(user.dataValues, 'supersecretpassword')
                    reply(user)
                    .header("Authorization", token)
                    .state("token", token, cookieOptions)
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
        tags: ['api'],
        auth: false,
        validate: {
            payload: {
                username: Joi.string().alphanum().min(5).max(20).required(),
                password: Joi.string().min(5).max(100).required()
            }
        },
        handler: function(request, reply) {
            models.User.findOne({
                where: {
                    username: request.payload.username
                }
            })
            .then(user => {
                user.verifyPassword(request.payload.password, (valid) => {
                    if (valid) {
                        delete user.dataValues.password
                        var token = JWT.sign(user.dataValues, 'supersecretpassword')
                        reply(user)
                        .header("Authorization", token)
                        .state("token", token, cookieOptions)
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
        tags: ['api'],
        auth: false,
        handler: function(request, reply) {
            request.auth.session.clear()
            return reply({nessage: 'Logged out'})
        }
    }
}]
