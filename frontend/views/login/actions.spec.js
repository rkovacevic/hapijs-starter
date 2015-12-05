import {login} from './actions'
import {spy} from 'sinon'
import {expect} from 'chai'

describe('frontend login view actions', () => {
    it('validates input', () => {
        const action = login({
            username: 'a',
            password: 'b'
        })

        const dispatch = spy()
        action(dispatch)

        const loginRequest = dispatch.getCall(0).args[0]
        expect(loginRequest.type).to.equal('LOGIN_REQUEST')

        const loginFailure = dispatch.getCall(1).args[0]
        expect(loginFailure.type).to.equal('LOGIN_FAILURE')
        expect(loginFailure.payload).to.deep.equal([
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

    it('handles login', () => {
        const user = {
            username: 'aaaaa',
            password: 'bbbbb'
        }
        const action = login(user)

        const dispatch = spy()
        action(dispatch)

        const loginRequest = dispatch.getCall(0).args[0]
        expect(loginRequest.type).to.equal('LOGIN_REQUEST')

        const apiPost = dispatch.getCall(1).args[0]
        expect(apiPost.type).to.equal('API_POST')
        expect(apiPost.uri).to.equal('/api/users/login')
        expect(apiPost.payload).to.deep.equal(user)

        apiPost.onSuccess(dispatch, 'result')
        const loggedIn = dispatch.getCall(2).args[0]
        expect(loggedIn.type).to.equal('LOGGED_IN')
        expect(loggedIn.payload).to.equal('result')

        let pushState = dispatch.getCall(3).args[0]
        expect(pushState.payload.method).to.equal('pushState')
        expect(pushState.payload.args[1]).to.equal('/')

        apiPost.onError(dispatch, 'error')
        const loginFailure = dispatch.getCall(4).args[0]
        expect(loginFailure.type).to.equal('LOGIN_FAILURE')
        expect(loginFailure.payload).to.deep.equal([
            {
                path: 'username',
                message: 'Incorrect username'
            },
            {
                path: 'password',
                message: '...or password'
            }
        ])
    })
})
