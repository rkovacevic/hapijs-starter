const initialState = {
    error: {
        error: undefined,
        message: undefined
    }
}

const reducers = {
    'SERVER_ERROR': (state, payload) => {
        return Object.assign({}, state, {
            error: payload
        })
    },
    'NETWORK_ERROR': (state, payload) => {
        return Object.assign({}, state, {
            error: payload
        })
    }
}

export default {initialState, reducers}
