import {requestFailed} from './actions'
import {spy} from 'sinon'
import {expect} from 'chai'

describe('frontend api actions', () => {
    it('handles requestFailed', () => {
        const error = 'error'
        const action = requestFailed(error)

        const dispatch = spy()
        action(dispatch)

        const networkError = dispatch.getCall(0).args[0]
        expect(networkError.type).to.equal('NETWORK_ERROR')
        expect(networkError.payload).to.equal(error)

        const pushState = dispatch.getCall(1).args[0]
        expect(pushState.payload.method).to.equal('pushState')
        expect(pushState.payload.args[1]).to.equal('/serverError')
    })
})
