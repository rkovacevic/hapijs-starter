import {registerUser} from './actions'
import {spy} from 'sinon'
import {expect} from 'chai'

describe('frontend register view actions', () => {
    it('validates input', () => {
        const action = registerUser({
            username: 'a',
            password: 'b',
            repeatPassword: 'b'
        })

        const dispatch = spy()
        action(dispatch)

        const registerRequest = dispatch.getCall(0).args[0]
        expect(registerRequest.type).to.equal('REGISTER_REQUEST')

        const registerFailure = dispatch.getCall(1).args[0]
        expect(registerFailure.type).to.equal('REGISTER_FAILURE')
        expect(registerFailure.payload).to.deep.equal([
            {
                'message': 'Must be at least 5 characters long',
                'path': 'username'
            },
            {
                'message': 'Must be at least 5 characters long',
                'path': 'password'
            }
        ])
    })

    it('validates password repeat', () => {
        const action = registerUser({
            username: 'aaaaa',
            password: 'bbbbb',
            repeatPassword: 'ccccc'
        })

        const dispatch = spy()
        action(dispatch)

        const registerFailure = dispatch.getCall(1).args[0]
        expect(registerFailure.type).to.equal('REGISTER_FAILURE')
        expect(registerFailure.payload).to.deep.equal([
            {
                'message': 'Passwords need to match',
                'path': 'repeatPassword'
            }
        ])
    })

    it('handles registerUser', () => {
        const user = {
            username: 'aaaaa',
            password: 'bbbbb',
            repeatPassword: 'bbbbb'
        }
        const action = registerUser(user)

        const dispatch = spy()
        action(dispatch)

        const apiPost = dispatch.getCall(1).args[0]
        expect(apiPost.type).to.equal('API_POST')
        expect(apiPost.uri).to.equal('/api/users')
        expect(apiPost.payload).to.deep.equal(user)

        apiPost.onSuccess(dispatch, 'result')
        const registerSuccess = dispatch.getCall(2).args[0]
        expect(registerSuccess.type).to.equal('REGISTER_SUCCESS')
        expect(registerSuccess.payload).to.equal('result')

        const loggedIn = dispatch.getCall(3).args[0]
        expect(loggedIn.type).to.equal('LOGGED_IN')
        expect(loggedIn.payload).to.equal('result')

        let pushState = dispatch.getCall(4).args[0]
        expect(pushState.payload.method).to.equal('pushState')
        expect(pushState.payload.args[1]).to.equal('/')

        apiPost.onError(dispatch, {
            validationErrors: 'errors'
        })
        const registerFailure = dispatch.getCall(5).args[0]
        expect(registerFailure.type).to.equal('REGISTER_FAILURE')
        expect(registerFailure.payload).to.equal('errors')
    })
})
