import {createReducer} from '../utils'
import {REGISTRATION_REQUEST, REGISTRATION_FAILURE, REGISTRATION_SUCCESS} from '../constants'
import {pushState} from 'redux-router'

const initialState = {
    validationErrors: null
}

export default createReducer(initialState, {
    [REGISTRATION_REQUEST]: (state, payload) => {
        return state
    }, [REGISTRATION_SUCCESS]: (state, payload) => {
        return state
    }, [REGISTRATION_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'validationErrors': payload.validationErrors
        })
    }
})
