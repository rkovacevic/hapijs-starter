import { pushState } from 'redux-router'
import api  from '../../services/api'

export function loadingUserData() {
    return {
        type: 'LOADING_USER_DATA',
    }
}

export function loggedOut() {
    return {
        type: 'LOGGED_OUT',
    }
}

export function userDataLoaded(user) {
    return {
        type: 'USER_DATA_LOADED',
        payload: user
    }
}

export function loggedIn(user) {
    return {
        type: 'LOGGED_IN',
        payload: user
    }
}

export function userDataLoadingFailed() {
    return {
        type: 'USER_DATA_LOADING_FAILED'
    }
}

export function loadUserData() {

    return function(dispatch) {
        dispatch(loadingUserData())

        api.get(dispatch, '/api/users/me')
        .then(result => {
            dispatch(userDataLoaded(result))
        })
        .catch(error => {
            dispatch(userDataLoadingFailed())
        })
    }
}

export function logout() {

    return function(dispatch) {
        api.get(dispatch, '/api/users/logout')
        .then(result => {
            dispatch(loggedOut())
        })
        .catch(error => {
            // TODO handle this better
            dispatch(loggedOut())
        })
    }
}
