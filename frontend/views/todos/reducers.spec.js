import reducers from './reducers'
import {expect} from 'chai'

describe('views/todos reducers', () => {
    it('has correct initialState', () => {
        expect(reducers.initialState).to.deep.equal({
            validationErrors: [],
            todos: undefined
        })
    })

    it('handles add todo success', () => {
        const reduced = reducers.reducers['ADD_TODO_SUCCESS']({
            todos: ['todo1']
        }, 'todo2')
        expect(reduced.validationErrors.length).to.equal(0)
        expect(reduced.todos).to.deep.equal(['todo1', 'todo2'])
    })

    it('handles add todo failure', () => {
        const reduced = reducers.reducers['ADD_TODO_FAILURE']({}, 'payload')
        expect(reduced.validationErrors).to.equal('payload')
    })

    it('handles toggle todo done success', () => {
        const reduced = reducers.reducers['TOGGLE_TODO_DONE_SUCCESS']({
            todos: [
                {
                    id: 1,
                    text: 'do something',
                    done: false
                },
                {
                    id: 2,
                    text: 'do something else',
                    done: false
                }
            ]
        }, {
            id: 1,
            text: 'do something',
            done: true
        })
        expect(reduced.todos).to.deep.equal([
            {
                id: 1,
                text: 'do something',
                done: true
            },
            {
                id: 2,
                text: 'do something else',
                done: false
            }
        ])
    })

    it('handles get todos request', () => {
        const reduced = reducers.reducers['GET_TODOS_REQUEST']({}, undefined)
        expect(reduced.todos).to.equal(undefined)
    })

    it('handles get todos success', () => {
        const reduced = reducers.reducers['GET_TODOS_SUCCESS']({}, 'todos')
        expect(reduced.todos).to.equal('todos')
    })
})
