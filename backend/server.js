var Path = require('path')
var Hapi = require('hapi')
var Inert = require('inert')
var Good = require('good')
var models = require('./models')
var routes = require('./routes')

var server = new Hapi.Server()

server.connection({ 
    port: process.env.PORT || 3000,
    host: process.env.IP || '0.0.0.0'
})

var plugins = [
    Inert, 
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

    models.sequelize.sync().then(() => {
        server.start( err => {
            if (err) throw err
            console.log('Server running at:', server.info.uri)
        })
    }, err => {
        throw err
    })
})