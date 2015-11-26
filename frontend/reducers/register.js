import {createReducer} from '../utils'
import actionTypes from '../constants/actionTypes'
import {pushState} from 'redux-router'

const initialState = {
    validationErrors: null
}

export default createReducer(initialState, {
    [actionTypes.REGISTRATION_REQUEST]: (state, payload) => {
        return state
    }, [actionTypes.REGISTRATION_SUCCESS]: (state, payload) => {
        return state
    }, [actionTypes.REGISTRATION_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'validationErrors': payload.validationError.validationErrors
        })
    }
})
