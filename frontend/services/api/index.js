import {requestFailed} from './actions'

let execute = function(dispatch, uri, options) {
    options = options || {}
    options.credentials = options.credentials || 'same-origin'
    if (options.headers === undefined) {
        options.headers = new Headers()
    }
    options.headers.set('Content-Type', 'application/json')
    options.headers.set('Accept', 'application/json')

    return new Promise((resolve, reject) => {
        fetch(uri, options)
        .then(response => {
            if (response.ok) {
                if (response.headers.get('content-type').indexOf('application/json') !== -1) {
                    resolve(response.json())
                } else {
                    dispatch(requestFailed({
                        error: 'Server error',
                        message: 'Oops, something is with our server, sorry for the inconvenience',
                        debug: 'Response from "' + response.url + '" has unexpected "content-type"'
                    }))
                }
            } else {
                response.json()
                .then(json => { reject(json) })
                .catch(error => {
                    dispatch(requestFailed({
                        error: 'Server error',
                        message: 'Oops, something is with our server, sorry for the inconvenience',
                        debug: error
                    }))
                })
            }
        })
        .catch(response => {
            dispatch(requestFailed({
                error: 'Server unreachable',
                message: 'Please check your internet connection',
                debug: response
            }))
        })
    })
}

const api = {
    get: function(dispatch, uri, options) {
        let getOptions = {
            method: 'GET'
        }
        if (options !== undefined) {
            Object.assign(getOptions, options)
        }

        return execute(dispatch, uri, getOptions)
    },
    post: function(dispatch, uri, payload, options) {
        let postOptions = {
            method: 'POST',
            body: JSON.stringify(payload)
        }
        if (options !== undefined) {
            Object.assign(postOptions, options)
        }

        return execute(dispatch, uri, postOptions)
    }
}

export default api
