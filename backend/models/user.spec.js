var models = require('../models')
import {expect} from 'chai'


describe('user model', () => {

    it('hashes password', (done) => {
        models.User.hashPassword('test', (hashedPassword) => {
            expect(hashedPassword).to.exist
            done()
        })
    })

    it('creates', (done) => {
        models.User.create({
            username: 'testuser',
            password: 'testpass',
            scope: 'test'
        })
        .then(user => {
            expect(user.dataValues.id).to.exist
            user.destroy().then(() => { done() })
        })
    })

    it('validates', (done) => {
        models.User.create({
            username: 'test',
            password: 'test',
            scope: 'test'
        })
        .catch(error => {
            expect(error.errors[0].path).to.equal('username')
            expect(error.errors[0].message).to.equal('Validation len failed')
            done()
        })
    })
})
