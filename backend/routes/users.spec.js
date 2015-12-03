var expect = require('chai').expect
var Server = require('../server')

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
        return server.injectThen({
            method: 'GET',
            url: '/api/users/me'
        }).then((response) => {
            expect(response.statusCode).to.equal(401)
            done()
        }).catch(done)
    })

    it('returns credentials on /api/users/me', (done) => {
        return server.injectThen({
            method: 'GET',
            url: '/api/users/me',
            credentials: {
                username: 'homer',
                scope: 'user'
            }
        }).then((response) => {
            expect(response.statusCode).to.equal(200)
            expect(response.result.username).to.equal('homer')
            done()
        }).catch(done)
    })

    it('has basic auth functionality', (done) => {
        return server.injectThen({
            method: 'POST',
            url: '/api/users',
            payload: {
                username: 'homer',
                password: 'beavis'
            }
        }).then((registerResponse) => {
            expect(registerResponse.statusCode).to.equal(200)
            return server.injectThen({
                method: 'POST',
                url: '/api/users/login',
                payload: {
                    username: 'homer',
                    password: 'beavis'
                }
            }).then((loginResponse) => {
                expect(loginResponse.statusCode).to.equal(200)
                return server.injectThen({
                    method: 'GET',
                    url: '/api/users/me',
                    headers: {
                        cookie: loginResponse.headers['set-cookie'][0].split(';')[0]
                    }
                }).then((meResponse) => {
                    expect(meResponse.statusCode).to.equal(200)
                    expect(meResponse.result.username).to.equal('homer')
                    done()
                })
            })
        }).catch(done)
    })

    it('rejects non unique username', (done) => {
        return server.injectThen({
            method: 'POST',
            url: '/api/users',
            payload: {
                username: 'homer',
                password: 'beavis'
            }
        }).then((registerResponse) => {
            return server.injectThen({
                method: 'POST',
                url: '/api/users',
                payload: {
                    username: 'homer',
                    password: 'beavis'
                }
            }).then((registerAgainResponse) => {
                expect(registerAgainResponse.statusCode).to.equal(422)
                done()
            })
        }).catch(done)
    })

    it('rejects login with invalid password', (done) => {
        return server.injectThen({
            method: 'POST',
            url: '/api/users',
            payload: {
                username: 'homer',
                password: 'beavis'
            }
        }).then((registerResponse) => {
            return server.injectThen({
                method: 'POST',
                url: '/api/users/login',
                payload: {
                    username: 'homer',
                    password: 'not-beavis'
                }
            }).then((loginResponse) => {
                expect(loginResponse.statusCode).to.equal(401)
                done()
            })
        }).catch(done)
    })

    it('refuses invalid login', (done) => {
        return server.injectThen({
            method: 'POST',
            url: '/api/users/login',
            payload: {
                username: 'invalid',
                password: 'credentials'
            }
        }).then((loginResponse) => {
            expect(loginResponse.statusCode).to.equal(401)
            done()
        }).catch(done)
    })

    it('validates', (done) => {
        return server.injectThen({
            method: 'POST',
            url: '/api/users',
            payload: {
                username: 'too',
                password: 'short'
            }
        }).then((registerResponse) => {
        	expect(registerResponse.statusCode).to.equal(422)
        	expect(registerResponse.result.validationErrors.length).to.be.greaterThan(0)
        	expect(registerResponse.result.validationErrors[0].path).to.equal('username')
        	done()
        }).catch(done)
    })
})
