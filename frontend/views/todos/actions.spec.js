import {addTodo, toggleTodoDone, getTodos} from './actions'
import {spy} from 'sinon'
import {expect} from 'chai'

describe('frontend todos view actions', () => {
    it('validates add todo', () => {
        const action = addTodo(1, {
            text: ''
        })

        const dispatch = spy()
        action(dispatch)

        const addTodoFailure = dispatch.getCall(1).args[0]
        expect(addTodoFailure.type).to.equal('ADD_TODO_FAILURE')
        expect(addTodoFailure.payload).to.deep.equal([
            {
                'message': 'Enter what you need to do',
                'path': 'text'
            }
        ])
    })

    it('handles addTodo', () => {
        const todo = {
            text: 'do something'
        }
        const action = addTodo(1, todo)

        const dispatch = spy()
        action(dispatch)

        const apiPost = dispatch.getCall(1).args[0]
        expect(apiPost.type).to.equal('API_POST')
        expect(apiPost.uri).to.equal('/api/users/1/todos')
        expect(apiPost.payload).to.deep.equal(todo)

        apiPost.onSuccess(dispatch, 'result')
        const addTodoSuccess = dispatch.getCall(2).args[0]
        expect(addTodoSuccess.type).to.equal('ADD_TODO_SUCCESS')
        expect(addTodoSuccess.payload).to.equal('result')

        apiPost.onError(dispatch, {
            validationErrors: 'errors'
        })
        const addTodoFailure = dispatch.getCall(3).args[0]
        expect(addTodoFailure.type).to.equal('ADD_TODO_FAILURE')
        expect(addTodoFailure.payload).to.equal('errors')
    })

    it('handles toggleTodoDone', () => {
        const todo = {
            id: 1,
            text: 'do something',
            done: false
        }
        const action = toggleTodoDone(1, todo)

        const dispatch = spy()
        action(dispatch)

        const apiPut = dispatch.getCall(0).args[0]
        expect(apiPut.type).to.equal('API_PUT')
        expect(apiPut.uri).to.equal('/api/users/1/todos/1')
        expect(apiPut.payload.done).to.equal(true)

        apiPut.onSuccess(dispatch, 'result')
        const toggleTodoDoneSuccess = dispatch.getCall(1).args[0]
        expect(toggleTodoDoneSuccess.type).to.equal('TOGGLE_TODO_DONE_SUCCESS')
        expect(toggleTodoDoneSuccess.payload).to.equal('result')

        apiPut.onError(dispatch, undefined)
        const toggleTodoDoneFailure = dispatch.getCall(2).args[0]
        expect(toggleTodoDoneFailure.type).to.equal('TOGGLE_TODO_DONE_FAILURE')
    })

    it('handles getTodos', () => {
        const action = getTodos(1)

        const dispatch = spy()
        action(dispatch)

        expect(dispatch.getCall(0).args[0].type).to.equal('GET_TODOS_REQUEST')

        const apiGet = dispatch.getCall(1).args[0]
        expect(apiGet.type).to.equal('API_GET')
        expect(apiGet.uri).to.equal('/api/users/1/todos')

        apiGet.onSuccess(dispatch, 'result')
        const getTodosSuccess = dispatch.getCall(2).args[0]
        expect(getTodosSuccess.type).to.equal('GET_TODOS_SUCCESS')
        expect(getTodosSuccess.payload).to.equal('result')

        apiGet.onError(dispatch, undefined)
        const getTodosFailure = dispatch.getCall(3).args[0]
        expect(getTodosFailure.type).to.equal('GET_TODOS_FAILURE')
    })
})
