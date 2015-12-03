import reducers from './reducers'
import {expect} from 'chai'

describe('views/register reducers', () => {
    it('has correct initialState', () => {
        expect(reducers.initialState).to.deep.equal({
            validationErrors: []
        })
    })

    it('handles register failure', () => {
        const reduced = reducers.reducers['REGISTER_FAILURE']({}, 'payload')
        expect(reduced.validationErrors).to.equal('payload')
    })

})
