var Path = require('path')
var Hapi = require('hapi')
var Inert = require('inert')
var Good = require('good')

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
    
    server.route({
        method: 'GET',
        path: '/api/users/me',
        handler: function (request, reply) {
            reply({username: 'Joe User'})
        }
    })
    
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: function (request, reply) {
            reply.file(Path.join(__dirname, 'frontend', 'index.html'))
        }
    })
    
    server.route({
        method: 'GET',
        path: '/build/{param*}',
        handler: {
        directory: {
            path: Path.join(__dirname, 'build'),
            index: true
            }
        }
    })

    server.start( err => {
        if (err) throw err
        console.log('Server running at:', server.info.uri)
    })
})