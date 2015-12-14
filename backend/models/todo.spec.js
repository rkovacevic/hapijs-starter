var models = require('../models')
import {expect} from 'chai'


describe('todo model', () => {

    let user

    beforeEach(done => {
        models.User.create({
            username: 'testuser',
            password: 'testpass',
            scope: 'test'
        })
        .then(u => {
            user = u
            done()
        })
    })

    afterEach(done => {
        user.destroy().then(() => { done() })
    })

    it('creates', (done) => {
        models.Todo.create({
            text: 'Do something...',
            done: false,
            UserId: user.get('id')
        })
        .then(todo => {
            expect(todo.dataValues.id).to.exist
            done()
        })
    })

    it('validates', (done) => {
        models.Todo.create({
            text: '',
            done: false,
            UserId: user.get('id')
        })
        .catch(error => {
            expect(error.errors[0].path).to.equal('text')
            expect(error.errors[0].message).to.equal('Validation len failed')
            done()
        })
    })
})
