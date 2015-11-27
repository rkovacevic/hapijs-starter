import { pushState } from 'redux-router'
import { createReducer } from '../../utils'

const initialState = {
    validationErrors: []
}

export default createReducer(initialState, {
    ['REGISTER_REQUEST']: (state, payload) => {
        return state
    }, ['REGISTER_SUCCESS']: (state, payload) => {
        return state
    }, ['REGISTER_FAILURE']: (state, payload) => {
        return Object.assign({}, state, {
            'validationErrors': payload
        })
    }
})
