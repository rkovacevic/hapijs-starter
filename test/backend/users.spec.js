var expect = require('chai').expect
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

    it('returns 401 unauthorized, without auth', (done) => {
        server.inject({
            method: 'GET',
            url: '/api/users/me'
        }, (response) => {
            expect(response.statusCode).to.equal(401)
            done()
        })
    })

    it('returns credentials on /api/users/me', (done) => {
        server.inject({
            method: 'GET',
            url: '/api/users/me',
            credentials: {
                username: 'homer',
                scope: 'user'
            }
        }, (response) => {
            expect(response.statusCode).to.equal(200)
            expect(response.result.username).to.equal('homer')
            done()
        })
    })

    it('has basic auth functionality', (done) => {
        server.inject({
            method: 'POST',
            url: '/api/users',
            payload: {
                username: 'homer',
                password: 'beavis'
            }
        }, (registerResponse) => {
            expect(registerResponse.statusCode).to.equal(200)
            server.inject({
                method: 'POST',
                url: '/api/users/login',
                payload: {
                    username: 'homer',
                    password: 'beavis'
                }
            }, (loginResponse) => {
                expect(loginResponse.statusCode).to.equal(200)
                server.inject({
                    method: 'GET',
                    url: '/api/users/me',
                    headers: {
                        cookie: loginResponse.headers['set-cookie'][0].split(';')[0]
                    }
                }, (meResponse) => {
                    expect(meResponse.statusCode).to.equal(200)
                    expect(meResponse.result.username).to.equal('homer')
                    done()
                })
            })
        })
    })

    it('rejects non unique username', (done) => {
        server.inject({
            method: 'POST',
            url: '/api/users',
            payload: {
                username: 'homer',
                password: 'beavis'
            }
        }, (registerResponse) => {
            server.inject({
                method: 'POST',
                url: '/api/users',
                payload: {
                    username: 'homer',
                    password: 'beavis'
                }
            }, (registerAgainResponse) => {
                expect(registerAgainResponse.statusCode).to.equal(422)
                done()
            })
        })
    })

    it('refuses invalid login', (done) => {
        server.inject({
            method: 'POST',
            url: '/api/users/login',
            payload: {
                username: 'invalid',
                password: 'credentials'
            }
        }, (loginResponse) => {
            expect(loginResponse.statusCode).to.equal(401)
            done()
        })
    })

    it('validates', (done) => {
        server.inject({
            method: 'POST',
            url: '/api/users',
            payload: {
                username: 'too',
                password: 'short'
            }
        }, (registerResponse) => {
        	expect(registerResponse.statusCode).to.equal(422)
        	expect(registerResponse.result.validationErrors.length).to.be.greaterThan(0)
        	expect(registerResponse.result.validationErrors[0].path).to.equal('username')
        	done()
        })
    })
})
