import { pushState } from 'redux-router'
import { createReducer } from '../../utils'

const initialState = {
    validationErrors: []
}

export default createReducer(initialState, {
    ['LOGIN_REQUEST']: (state, payload) => {
        return state
    }, ['LOGIN_FAILURE']: (state, payload) => {
        return Object.assign({}, state, {
            'validationErrors': payload
        })
    }
})
