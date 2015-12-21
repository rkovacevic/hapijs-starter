import '../../utils/setupFakeDOM'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {shallowRender} from '../../utils/testUtils'
import {Todos} from '.'
import {expect} from 'chai'
import {findWithType, findAllWithType, findWithRef} from 'react-shallow-testutils'
import {Input, ListGroupItem} from 'react-bootstrap'
import {spy} from 'sinon'

describe('frontend todos view', () => {

    it('renders todos', () => {
        const component = shallowRender(Todos, {
            todos: [
                {
                    id: 1,
                    text: 'todo1',
                    done: true
                },
                {
                    id: 2,
                    text: 'todo2',
                    done: false
                },
                {
                    id: 3,
                    text: 'todo3',
                    done: false
                }
            ]
        })
        const todoItems = findAllWithType(component, ListGroupItem)
        expect(todoItems[0].props.children[1]).to.equal('todo3')
        expect(todoItems[1].props.children[1]).to.equal('todo2')
        expect(todoItems[2].props.children[1]).to.equal('todo1')
    })

    it('renders validation errors', () => {
        const component = shallowRender(Todos, {
            validationErrors: [
                {
                    path: 'text',
                    message: 'error'
                }
            ]
        })
        expect(findWithRef(component, 'todo').props.bsStyle).to.equal('error')
        expect(findWithRef(component, 'todo').props.help).to.equal('error')
    })

    it('calls getTodos on mount', () => {
        const getTodos = spy()

        const noOp = () => {}
        const user = {
            id: 1
        }

        const tree = TestUtils.renderIntoDocument(<Todos addTodo={noOp} user={user} getTodos={getTodos} toggleTodoDone={noOp} />)
        const component = TestUtils.findRenderedComponentWithType(tree, Todos)

        expect(getTodos.getCall(0).args[0]).to.equal(user.id)
    })

    it('form submit works', () => {
        const addTodo = spy()
        const noOp = () => {}
        const user = {
            id: 1
        }

        const tree = TestUtils.renderIntoDocument(<Todos addTodo={addTodo} user={user} getTodos={noOp} toggleTodoDone={noOp} />)
        const component = TestUtils.findRenderedComponentWithType(tree, Todos)

        component.refs.todo.getInputDOMNode().value = 'test'

        TestUtils.Simulate.submit(component.refs.form)

        expect(addTodo.getCall(0).args[0]).to.equal(1)
        expect(addTodo.getCall(0).args[1].text).to.equal('test')
    })

    it('toggles done state when an item is clicked', () => {
        const toggleTodoDone = spy()
        const noOp = () => {}
        const user = {
            id: 1
        }
        const todo = {
            id: 1,
            text: 'do something',
            done: false
        }

        const tree = TestUtils.renderIntoDocument(
            <Todos addTodo={noOp} user={user} getTodos={noOp} toggleTodoDone={toggleTodoDone} todos={[todo]}/>
        )
        const component = TestUtils.findRenderedComponentWithType(tree, Todos)

        const todoItem = TestUtils.scryRenderedComponentsWithType(tree, ListGroupItem)[0]
        todoItem.props.onClick(user.id, todo)
        
        expect(toggleTodoDone.getCall(0).args[0]).to.equal(1)
        expect(toggleTodoDone.getCall(0).args[1]).to.deep.equal(todo)
    })
})
