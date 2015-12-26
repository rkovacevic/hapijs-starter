import React, { Component } from 'react'
import { Jumbotron, Button, Input, ButtonInput, ListGroupItem, ListGroup, Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {addTodo, getTodos, toggleTodoDone} from './actions'
import Shuffle from 'react-shuffle'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import './index.css'

export class Todos extends React.Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onTodoClick = this.onTodoClick.bind(this)
    }

    componentDidMount() {
        this.props.getTodos(this.props.user.id)
    }

    componentDidUpdate() {
        this.refs.todo.getInputDOMNode().value = ''
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.addTodo(this.props.user.id, {
            text: this.refs.todo.getValue(),
        })
    }

    onTodoClick(todo, event) {
        this.props.toggleTodoDone(this.props.user.id, todo)
    }

    render() {
        let styles = {}
        let helps = {}

        if (this.props.validationErrors) {
            this.props.validationErrors.forEach(validationError => {
                styles[validationError.path] = 'error'
                helps[validationError.path] = validationError.message
            })
        }

        let todos = undefined

        if (this.props.todos !== undefined) {
            todos = this.props.todos.sort((a, b) => {
                if (a.done != b.done) return a.done ? 1 : -1
                return b.id - a.id
            })
        }

        return (
            <div>
                <form ref="form" onSubmit={this.onSubmit}>
                    <Input
                        ref="todo"
                        type="text"
                        placeholder="What do you need to do?"
                        bsStyle={styles.text}
                        help={helps.text} />
                </form>
                {todos === undefined ?
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                    :
                    todos.length === 0 ?
                        <p>You have nothing to do.</p>
                        :
                        <ListGroup>
                            <Shuffle>
                            {todos.map(todo => {
                                return (
                                    <ListGroupItem key={todo.id} onClick={this.onTodoClick.bind(undefined, todo)} bsStyle={todo.done ? 'success' : 'info'}>
                                        {todo.done ?
                                            <Glyphicon glyph="ok" style={{paddingRight: '20px'}} />
                                        : false}
                                        {todo.text}
                                    </ListGroupItem>
                                )
                            })}
                            </Shuffle>
                        </ListGroup>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.app.user,
    todos: state.todos.todos,
    validationErrors: state.todos.validationErrors
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({addTodo, getTodos, toggleTodoDone}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
