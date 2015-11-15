var Server = require('./server')

Server.createServer({
    port: process.env.PORT || 3000,
    host: process.env.IP || '0.0.0.0'
}).then((server) => {
    server.start(err => {
        if (err) throw err
        console.log('\n\nServer running at:', server.info.uri)
    })
})