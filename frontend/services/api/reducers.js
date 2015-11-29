import { pushState } from 'redux-router'
import { createReducer } from '../../utils'

const initialState = {
    error: undefined
}

export default createReducer(initialState, {
    ['SERVER_ERROR']: (state, payload) => {
        return Object.assign({}, state, {
            error: payload
        })
    }, ['NETWORK_ERROR']: (state, payload) => {
        return Object.assign({}, state, {
            error: payload
        })
    }
})
