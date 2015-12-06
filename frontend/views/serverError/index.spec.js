import {ServerError} from '.'
import {shallowRender} from '../../utils/testUtils'
import {expect} from 'chai'
import {findWithType, findAllWithType} from 'react-shallow-testutils'
import {spy} from 'sinon'

describe('frontend server error view', () => {

    it('renders server error', () => {
        const component = shallowRender(ServerError, {
            error: {
                error: 'error',
                message: 'message'
            }
        })
        expect(findWithType(component, 'h1').props.children).to.equal('error')
        expect(findWithType(component, 'p').props.children).to.equal('message')
    })

    it('redirects to home if no error', () => {
        const dispatch = spy()
        const component = shallowRender(ServerError, {
            dispatch,
            error: {
                error: undefined,
                message: undefined
            }
        })
        let pushState = dispatch.getCall(0).args[0]
        expect(pushState.payload.method).to.equal('pushState')
        expect(pushState.payload.args[1]).to.equal('/')
    })
})
