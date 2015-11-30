const initialState = {
    validationErrors: []
}

const reducers = {
    'LOGIN_FAILURE': (state, payload) => {
        return Object.assign({}, state, {
            'validationErrors': payload
        })
    }
}

export default {initialState, reducers}
