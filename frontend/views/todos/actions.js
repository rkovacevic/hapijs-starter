import { pushState } from 'redux-router'

export function addTodoRequest() {
    return {
        type: 'ADD_TODO_REQUEST',
    }
}

export function addTodoSuccess(todo) {
    return {
        type: 'ADD_TODO_SUCCESS',
        payload: todo
    }
}

export function addTodoFailure(validationErrors) {
    return {
        type: 'ADD_TODO_FAILURE',
        payload: validationErrors
    }
}

export function toggleTodoDoneSuccess(todo) {
    return {
        type: 'TOGGLE_TODO_DONE_SUCCESS',
        payload: todo
    }
}

export function toggleTodoDoneFailure() {
    return {
        type: 'TOGGLE_TODO_DONE_FAILURE'
    }
}

export function getTodosRequest() {
    return {
        type: 'GET_TODOS_REQUEST',
    }
}

export function getTodosSuccess(todos) {
    return {
        type: 'GET_TODOS_SUCCESS',
        payload: todos
    }
}

export function getTodosFailure() {
    return {
        type: 'GET_TODOS_FAILURE'
    }
}

export function addTodo(userId, todo) {

    return function(dispatch) {
        dispatch(addTodoRequest())

        if (todo.text === undefined || todo.text.length === 0) {
            dispatch(addTodoFailure([{
                path: 'text',
                message: 'Enter what you need to do'
            }]))
            return
        }

        dispatch({
            type: 'API_POST',
            uri: `/api/users/${userId}/todos`,
            payload: todo,
            onSuccess: (dispatch, result) => {
                dispatch(addTodoSuccess(result))
            },
            onError: (dispatch, error) => {
                dispatch(addTodoFailure(error.validationErrors))
            }
        })
    }
}

export function toggleTodoDone(userId, todo) {

    return function(dispatch) {

        todo.done = todo.done ? false : true

        dispatch({
            type: 'API_PUT',
            uri: `/api/users/${userId}/todos/${todo.id}`,
            payload: todo,
            onSuccess: (dispatch, result) => {
                dispatch(toggleTodoDoneSuccess(result))
            },
            onError: (dispatch, error) => {
                dispatch(toggleTodoDoneFailure())
            }
        })
    }
}

export function getTodos(userId) {

    return function(dispatch) {
        dispatch(getTodosRequest())

        dispatch({
            type: 'API_GET',
            uri: `/api/users/${userId}/todos`,
            onSuccess: (dispatch, result) => {
                dispatch(getTodosSuccess(result))
            },
            onError: (dispatch, error) => {
                dispatch(getTodosFailure())
            }
        })
    }
}
