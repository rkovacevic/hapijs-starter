var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({ 
    port: process.env.PORT,
    host: process.env.IP
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});