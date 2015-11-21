let execute = function(uri, options) {
	options = options || {}
	options.credentials = options.credentials || 'same-origin'
    if (options.headers === undefined) {
    	options.headers = new Headers()
    }
    options.headers.set('Content-Type', 'application/json')
    options.headers.set('Accept', 'application/json')

    return fetch(uri, options)
        .catch(error => {
            // This error should be handled
            console.dir(error)
        })
        .then(response => {
            if (response.ok) {
				if (response.headers.get("content-type").indexOf("application/json") !== -1) {
					return response.json();
				} else {
					throw new TypeError('Response from "' + response.url + '" has unexpected "content-type"');
				}
            } else {
                return response.json().then(json => { throw json })
            }
        })
}

const api = {
    get: function(uri, options) {
        let getOptions = {
            method: 'GET'
        }
        if (options !== undefined) {
            Object.assign(getOptions, options)
        }

        return execute(uri, getOptions)
    },
    post: function(uri, payload, options) {
        let postOptions = {
            method: 'POST',
            body: JSON.stringify(payload)
        }
        if (options !== undefined) {
            Object.assign(postOptions, options)
        }

        return execute(uri, postOptions)
    }
}

export default api