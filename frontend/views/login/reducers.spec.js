import reducers from './reducers'
import {expect} from 'chai'

describe('views/login reducers', () => {
    it('has correct initialState', () => {
        expect(reducers.initialState).to.deep.equal({
            validationErrors: []
        })
    })

    it('handles login failure', () => {
        const reduced = reducers.reducers['LOGIN_FAILURE']({}, 'payload')
        expect(reduced.validationErrors).to.equal('payload')
    })

})
