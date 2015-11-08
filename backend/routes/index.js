var fs = require('fs')
var Path = require('path')
var routes = {}

routes.register = function(server) {
	fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
        var routes = require(Path.join(__dirname, file))
        routes.forEach(route => { server.route(route) })
    })
    
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: function (request, reply) {
            reply.file(Path.join(__dirname, '..', '..', 'frontend', 'index.html'))
        }
    })

    server.route({
        method: 'GET',
        path: '/build/{param*}',
        handler: {
        directory: {
            path: Path.join(__dirname, '..', '..', 'build'),
            index: true
            }
        }
    })
}

module.exports = routes;