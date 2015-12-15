var expect = require('chai').expect
var Server = require('../server')
var models = require('../models')


describe('Todos', () => {

    var server
    var user
    var todo

    beforeEach((done) => {
        Server.createServer({
            port: process.env.PORT || 3000,
            host: process.env.IP || '0.0.0.0'
        }).then((s) => {
            server = s
            models.User.create({
                username: 'testuser',
                password: 'testpass',
                scope: 'user'
            })
            .then(u => {
                user = u
                models.Todo.create({
                    UserId: u.get('id'),
                    text: 'Do something'
                }).then((t) => {
                    todo = t
                    done()
                })
            })
        })
    })

    afterEach(() => {
        server.stop({}, (err) => {
            if (err) throw err
        })
    })

    it('GETs todos', (done) => {
        return server.injectThen({
            method: 'GET',
            url: `/api/users/${user.get('id')}/todos`,
            credentials: user
        }).then((response) => {
            expect(response.result[0].text).to.equal('Do something')
            done()
        }).catch(done)
    })

    it('POSTs todos', (done) => {
        return server.injectThen({
            method: 'POST',
            url: `/api/users/${user.get('id')}/todos`,
            payload: {
                text: 'Do something else'
            },
            credentials: user
        }).then((response) => {
            expect(response.statusCode).to.equal(200)
            models.Todo.findAll({
                where: {
                    text: 'Do something else'
                },
                raw: true
            }).then(todos => {
                expect(todos[0].text).to.equal('Do something else')
                done()
            })
        }).catch(done)
    })

    it('PUTs todos', (done) => {
        return server.injectThen({
            method: 'PUT',
            url: `/api/users/${user.get('id')}/todos/${todo.get('id')}`,
            payload: {
                text: 'Do something else'
            },
            credentials: user
        }).then((response) => {
            expect(response.statusCode).to.equal(200)
            models.Todo.findAll({
                where: {
                    text: 'Do something else'
                },
                raw: true
            }).then(todos => {
                expect(todos[0].text).to.equal('Do something else')
                done()
            })
        }).catch(done)
    })

    it('DELETEs todos', (done) => {
        return server.injectThen({
            method: 'DELETE',
            url: `/api/users/${user.get('id')}/todos/${todo.get('id')}`,
            credentials: user
        }).then((response) => {
            expect(response.statusCode).to.equal(200)
            models.Todo.findAll().then(todos => {
                expect(todos.length).to.equal(0)
                done()
            })
        }).catch(done)
    })

})
