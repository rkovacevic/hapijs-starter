const initialState = {
    user: undefined,
    loadingUserData: true
}

const reducers = {
    'LOADING_USER_DATA': (state, payload) => {
        return Object.assign({}, state, {
            loadingUserData: true
        })
    },
    'USER_DATA_LOADED': (state, payload) => {
        return Object.assign({}, state, {
            user: payload,
            loadingUserData: false
        })
    },
    'LOGGED_IN': (state, payload) => {
        return Object.assign({}, state, {
            user: payload
        })
    },
    'LOGGED_OUT': (state, payload) => {
        return Object.assign({}, state, {
            user: undefined
        })
    },
    'USER_DATA_LOADING_FAILED': (state, payload) => {
        return Object.assign({}, state, {
            user: undefined,
            loadingUserData: false
        })
    }
}

export default {initialState, reducers}
