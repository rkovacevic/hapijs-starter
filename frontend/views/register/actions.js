import { pushState } from 'redux-router'
import api  from '../../services/api'

export function registrationRequest() {
    return {
        type: 'REGISTER_REQUEST',
    }
}

export function registrationSuccess(user) {
    return {
        type: 'REGISTER_SUCCESS',
        payload: {
            user: user
        }
    }
}

export function registrationFailure(validationErrors) {
    return {
        type: 'REGISTER_FAILURE',
        payload: validationErrors
    }
}

let validateUser = function(user) {
    let validationErrors = []

    if (user.username.length < 5) {
        validationErrors.push({
            path: 'username',
            message: 'Must be at least 5 characters long'
        })
    }

    if (user.password.length < 5) {
        validationErrors.push({
            path: 'password',
            message: 'Must be at least 5 characters long'
        })
    }

    if (user.repeatPassword !== user.password) {
        validationErrors.push({
            path: 'repeatPassword',
            message: 'Passwords need to match'
        })
    }

    return validationErrors
}

export function registerUser(user) {

    return function(dispatch) {
        dispatch(registrationRequest());

        let validationErrors = validateUser(user)

        if (validationErrors.length > 0) {
            dispatch(registrationFailure(validationErrors))
            return
        }

        api.post(dispatch, '/api/users', user)
        .then(result => {
            dispatch(registrationSuccess(result))
            dispatch(pushState(null, '/'))
        })
        .catch(error => {
            dispatch(registrationFailure(error.validationErrors))
        })
    }
}
