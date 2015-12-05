import {loadUserData, logout} from './actions'
import {spy} from 'sinon'
import {expect} from 'chai'

describe('frontend app actions', () => {
    it('handles loadUserData', () => {
        const action = loadUserData()

        const dispatch = spy()
        action(dispatch)

        const loadingUserData = dispatch.getCall(0).args[0]
        expect(loadingUserData.type).to.equal('LOADING_USER_DATA')

        const apiGet = dispatch.getCall(1).args[0]
        expect(apiGet.type).to.equal('API_GET')
        expect(apiGet.uri).to.equal('/api/users/me')

        apiGet.onSuccess(dispatch, 'result')
        const userDataLoaded = dispatch.getCall(2).args[0]
        expect(userDataLoaded.type).to.equal('USER_DATA_LOADED')
        expect(userDataLoaded.payload).to.equal('result')

        apiGet.onError(dispatch, 'error')
        const userDataLoadingFailed = dispatch.getCall(3).args[0]
        expect(userDataLoadingFailed.type).to.equal('USER_DATA_LOADING_FAILED')
    })

    it('handles logout', () => {
        const action = logout()

        const dispatch = spy()
        action(dispatch)

        const apiGet = dispatch.getCall(0).args[0]
        expect(apiGet.type).to.equal('API_GET')
        expect(apiGet.uri).to.equal('/api/users/logout')

        apiGet.onSuccess(dispatch, undefined)
        const loggedOutSuccess = dispatch.getCall(1).args[0]
        expect(loggedOutSuccess.type).to.equal('LOGGED_OUT')

        let pushState = dispatch.getCall(2).args[0]
        expect(pushState.payload.method).to.equal('pushState')
        expect(pushState.payload.args[1]).to.equal('/')

        apiGet.onError(dispatch, 'error')
        const loggedOutError = dispatch.getCall(3).args[0]
        expect(loggedOutError.type).to.equal('LOGGED_OUT')

        pushState = dispatch.getCall(4).args[0]
        expect(pushState.payload.method).to.equal('pushState')
        expect(pushState.payload.args[1]).to.equal('/')
    })
})
