const initialState = {
    validationErrors: [],
    todos: undefined
}

const reducers = {
    'ADD_TODO_SUCCESS': (state, payload) => {
        return Object.assign({}, state, {
            todos: state.todos.concat([payload]),
            validationErrors: []
        })
    },
    'ADD_TODO_FAILURE': (state, payload) => {
        return Object.assign({}, state, {
            validationErrors: payload
        })
    },
    'GET_TODOS_REQUEST': (state, payload) => {
        return Object.assign({}, state, {
            todos: undefined
        })
    },
    'GET_TODOS_SUCCESS': (state, payload) => {
        return Object.assign({}, state, {
            todos: payload
        })
    }
}

export default {initialState, reducers}
