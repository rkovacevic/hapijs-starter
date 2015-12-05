import { pushState } from 'redux-router'
import { loggedIn } from '../app/actions'

export function loginRequest() {
    return {
        type: 'LOGIN_REQUEST',
    }
}

export function loginFailure(validationErrors) {
    return {
        type: 'LOGIN_FAILURE',
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

    return validationErrors
}

export function login(user) {

    return function(dispatch) {
        dispatch(loginRequest())

        let validationErrors = validateUser(user)

        if (validationErrors.length > 0) {
            dispatch(loginFailure(validationErrors))
            return
        }

        dispatch({
            type: 'API_POST',
            uri: '/api/users/login',
            payload: user,
            onSuccess: (dispatch, result) => {
                dispatch(loggedIn(result))
                dispatch(pushState(null, '/'))
            },
            onError: (dispatch, error) => {
                const validationErrors = [
                    {
                        path: 'username',
                        message: 'Incorrect username'
                    },
                    {
                        path: 'password',
                        message: '...or password'
                    }
                ]
                dispatch(loginFailure(validationErrors))
            }
        })
    }
}
