import {REGISTRATION_REQUEST, REGISTRATION_FAILURE, REGISTRATION_SUCCESS} from '../constants'
import {pushState} from 'redux-router'
import api from '../services/api'

export function registrationRequest() {
    return {
        type: REGISTRATION_REQUEST
    }
}

export function registrationSuccess(user) {
    return {
        type: REGISTRATION_SUCCESS,
        payload: {
            user: user
        }
    }
}

export function registrationFailure(error) {
    return {
        type: REGISTRATION_FAILURE,
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
                console.dir(result)
                dispatch(registrationSuccess(result.payload))
                dispatch(pushState(null, '/'))
            })
            .catch(error => {
                console.dir(error)
                dispatch(registrationFailure(error))
            })
    }
