var Path = require('path')
var Hapi = require('hapi')
var Inert = require('inert')
var Good = require('good')
var models = require('./models')
var routes = require('./routes')
var authCookie = require('hapi-auth-cookie')
var Promise = require('bluebird')


var plugins = [
    Inert, 
    authCookie,
    {
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: 'error'
                }
            }]
        }
    }
]

module.exports.createServer = function(connection) {
    var server = new Hapi.Server()

    server.connection(connection)
    
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
        
        server.auth.strategy('base', 'cookie', {
            password: 'supersecretpassword', // cookie secret
            cookie: 'app-cookie', // Cookie name
            isHttpOnly: true,
            path: '/api',
            isSecure: false,
            ttl: 24 * 60 * 60 * 1000 // Set session to 1 day
        })

        server.auth.default({
            strategy: 'base',
            scope: 'user'
        })

        return server
    })
}
