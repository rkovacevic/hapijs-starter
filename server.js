var Path = require('path');
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({ 
    port: process.env.PORT,
    host: process.env.IP
});

server.register(require('inert'), err => {
    if (err) throw err;

    // Serving static files from 'public' directory
    server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: Path.join(__dirname, 'public'),
            index: true
            }
        }
    });

    server.start( err => {
        if (err) throw err;
        console.log('Server running at:', server.info.uri);
    });
});