var Path = require('path')
var Hapi = require('hapi')
var Inert = require('inert')
var Good = require('good')
var models = require('./models')
var routes = require('./routes')
var authJwt = require('hapi-auth-jwt2')
var Promise = require('bluebird')
var injectThen = require('inject-then')
var Boom = require('boom')
var HapiSwagger = require('hapi-swagger')
var Vision = require('vision')


var goodPlugin = {
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}

var plugins = [
    Inert,
    authJwt,
    Vision,
    HapiSwagger
]

if (process.env.NODE_ENV !== 'test') {
    plugins.push(goodPlugin)
} else {
    plugins.push(injectThen)
}

process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
})

module.exports.createServer = function(connection) {
    var server = new Hapi.Server({
        connections: {
            routes: {
                validate: {
                    failAction: (request, reply, source, error) => {
                        if (source === 'payload') {
                            error.output.statusCode = 422
                            error.output.payload = {
                                validationErrors: error.data.details
                            }
                        }
                        reply(error)
                    }
                }
            }
        }
    })

    server.connection(connection)

    server.ext('onPreResponse', function(request, reply) {
        if (request.response.isBoom) {
            request.response.output.headers['Access-Control-Allow-Credentials'] = 'true'
        } else {
            request.response.header('Access-Control-Allow-Credentials', 'true')
        }
        return reply.continue()
    })

    var registerDeferred = Promise.defer()
    server.register(plugins, (err) => {
        if (err) registerDeferred.reject(err)
        registerDeferred.resolve()
    })

    return Promise.all([
        registerDeferred.promise,
        models.sequelize.sync({force: (process.env.NODE_ENV === 'test')})
    ]).then(() => {
        routes.register(server)

        server.auth.strategy('jwt', 'jwt', {
            key: 'supersecretpassword',
            validateFunc: function(decoded, request, callback) {
                // If 'userId' param is present in the route, only allow
                // access if it is equal to the logged in user. I.e. user can't
                // access assets for other users.
                if (decoded.scope !== 'admin' &&
                    request.params.userId !== undefined &&
                    parseInt(decoded.id, 10) !== parseInt(request.params.userId, 10)) {
                    callback('Unauthorized access', false)
                } else {
                    callback(undefined, true)
                }
            },
            verifyOptions: { algorithms: [ 'HS256' ] }
        })

        server.auth.default({
            strategy: 'jwt',
            scope: 'user'
        })

        return server
    })
}
