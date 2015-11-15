var Server = require('../../backend/server')

describe('Users', () => {

    var server

    beforeEach((done) => {
        Server.createServer({
            port: process.env.PORT || 3000,
            host: process.env.IP || '0.0.0.0'
        }).then((s) => {
            server = s
            done()
        })
    })

    afterEach(() => {
        server.stop({}, (err) => {
            if (err) throw err
        })
    })

    it('/api/users/me returns 401 unauthorized, without auth', (done) => {
        server.inject({
            method: "GET",
            url: "/api/users/me"
        }, (response) => {
            expect(response.statusCode).toBe(401)
            done()
        })
    })

})