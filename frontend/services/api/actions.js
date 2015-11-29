import { pushState } from 'redux-router'

export function networkError(error) {
    return {
        type: 'NETWORK_ERROR',
        payload: error
    }
}

export function serverError(error) {
    return {
        type: 'SERVER_ERROR',
        payload: error
    }
}

export function requestFailed(error) {
    return function(dispatch) {
        dispatch(networkError(error))
        dispatch(pushState(null, '/serverError'))
    }
}
