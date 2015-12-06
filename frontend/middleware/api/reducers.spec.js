import reducers from './reducers'
import {expect} from 'chai'

describe('frontend reducers reducers', () => {
    it('has correct initialState', () => {
        expect(reducers.initialState).to.deep.equal({
            error: {
                error: undefined,
                message: undefined
            }
        })
    })

    it('handles server error', () => {
        const reduced = reducers.reducers['SERVER_ERROR']({}, 'payload')
        expect(reduced.error).to.equal('payload')
    })

    it('handles network error', () => {
        const reduced = reducers.reducers['NETWORK_ERROR']({}, 'payload')
        expect(reduced.error).to.equal('payload')
    })
})
