import {requestFailed} from './actions'
import cookie from 'react-cookie'

export default store => next => action => {
    next(action)
    if (!action.type.startsWith('API_')) return

    const defaultOptions = {
        'API_GET': {
            method: 'GET'
        },
        'API_POST': {
            method: 'POST',
            body: JSON.stringify(action.payload)
        },
        'API_PUT': {
            method: 'PUT',
            body: JSON.stringify(action.payload)
        },
        'API_DELETE': {
            method: 'DELETE'
        }
    }

    let options = Object.assign({}, defaultOptions[action.type], action.options)
    options.credentials = options.credentials || 'same-origin'
    if (options.headers === undefined) {
        options.headers = new Headers()
    }
    options.headers.set('Content-Type', 'application/json')
    options.headers.set('Accept', 'application/json')
    options.headers.set('X-CSRF-Token', cookie.load('crumb'))

    fetch(action.uri, options)
    .then(response => {
        if (response.ok) {
            if (response.headers.get('content-type').indexOf('application/json') !== -1) {
                response.json()
                .then(json => { action.onSuccess(store.dispatch, json) })
                .catch(error => {
                    store.dispatch(requestFailed({
                        error: 'Server error',
                        message: 'Oops, something is with our server, sorry for the inconvenience',
                        debug: error
                    }))
                })
            } else {
                store.dispatch(requestFailed({
                    error: 'Server error',
                    message: 'Oops, something is with our server, sorry for the inconvenience',
                    debug: 'Response from "' + response.url + '" has unexpected "content-type"'
                }))
            }
        } else {
            response.json()
            .then(json => { action.onError(store.dispatch, json) })
            .catch(error => {
                store.dispatch(requestFailed({
                    error: 'Server error',
                    message: 'Oops, something is with our server, sorry for the inconvenience',
                    debug: error
                }))
            })
        }
    })
    .catch(response => {
        store.dispatch(requestFailed({
            error: 'Server unreachable',
            message: 'Please check your internet connection',
            debug: response
        }))
    })
}
