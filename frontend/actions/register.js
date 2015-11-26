import {pushState} from 'redux-router'
import actionTypes from '../constants/actionTypes'
import api from '../services/api'

export function registrationRequest() {
    return {
        type: actionTypes.REGISTRATION_REQUEST
    }
}

export function registrationSuccess(user) {
    return {
        type: actionTypes.REGISTRATION_SUCCESS,
        payload: {
            user: user
        }
    }
}

export function registrationFailure(error) {
    return {
        type: actionTypes.REGISTRATION_FAILURE,
        payload: {
            validationError: error
        }
    }
}

export function registerUser(user) {

    return function(dispatch) {
        dispatch(registrationRequest());

        api.post('/api/users', user)
            .then(result => {
                dispatch(registrationSuccess(result))
                dispatch(pushState(null, '/'))
            })
            .catch(error => {
                dispatch(registrationFailure(error))
            })
    }
}
