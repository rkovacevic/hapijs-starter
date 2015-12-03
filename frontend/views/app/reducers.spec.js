import reducers from './reducers'
import {expect} from 'chai'

describe('views/app reducers', () => {
    it('has correct initialState', () => {
        expect(reducers.initialState).to.deep.equal({
            user: undefined,
            loadingUserData: true
        })
    })

    it('handles loading user data', () => {
        const reduced = reducers.reducers['LOADING_USER_DATA']({}, 'payload')
        expect(reduced.loadingUserData).to.equal(true)
    })

    it('handles user data loaded', () => {
        const reduced = reducers.reducers['USER_DATA_LOADED']({}, 'payload')
        expect(reduced.loadingUserData).to.equal(false)
        expect(reduced.user).to.equal('payload')
    })

    it('handles logged in', () => {
        const reduced = reducers.reducers['LOGGED_IN']({}, 'payload')
        expect(reduced.user).to.equal('payload')
    })

    it('handles logged out', () => {
        const reduced = reducers.reducers['LOGGED_OUT']({}, 'payload')
        expect(reduced.user).to.equal(undefined)
    })

    it('handles user data loading failed', () => {
        const reduced = reducers.reducers['USER_DATA_LOADING_FAILED']({}, 'payload')
        expect(reduced.loadingUserData).to.equal(false)
        expect(reduced.user).to.equal(undefined)
    })
})
