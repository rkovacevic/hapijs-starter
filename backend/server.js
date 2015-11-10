var Path = require('path')
var Hapi = require('hapi')
var Inert = require('inert')
var Good = require('good')
var models = require('./models')
var routes = require('./routes')
var authCookie = require('hapi-auth-cookie')

var server = new Hapi.Server()

server.connection({ 
    port: process.env.PORT || 3000,
    host: process.env.IP || '0.0.0.0'
})

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

server.register(plugins, err => {
    if (err) throw err
    
    routes.register(server)
    
    server.auth.strategy('base', 'cookie', {
        password: 'supersecretpassword', // cookie secret
        cookie: 'app-cookie', // Cookie name
        ttl: 24 * 60 * 60 * 1000 // Set session to 1 day
    })

    server.auth.default({
        strategy: 'base',
        scope: 'user'
    })

    models.sequelize.sync(/*{force: true}*/).then(() => {
        server.start( err => {
            if (err) throw err
            console.log('Server running at:', server.info.uri)
        })
    }, err => {
        throw err
    })
})