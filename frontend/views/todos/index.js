import React, { Component } from 'react'
import { Jumbotron, Button, Input, ButtonInput, ListGroupItem, ListGroup, Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {addTodo, getTodos} from './actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

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

    onTodoClick(todo) {
        console.dir(todo)
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

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <Input
                        ref="todo"
                        type="text"
                        placeholder="What do you need to do?"
                        bsStyle={styles.text}
                        help={helps.text} />
                </form>
                {this.props.todos === undefined ?
                    <p>Loading...</p>
                    :
                    this.props.todos.length === 0 ?
                        <p>You have nothing to do.</p>
                        :
                        <ListGroup>
                            {this.props.todos.map(todo => {
                                return (
                                    <ListGroupItem key={todo.id} onClick={this.onTodoClick.bind(undefined, todo)} bsStyle={todo.done ? 'success' : 'info'}>
                                        {todo.done ?
                                            <Glyphicon glyph="ok" style={{paddingRight: '20px'}} />
                                        : false}
                                        {todo.text}
                                    </ListGroupItem>
                                )
                            })}
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
    return bindActionCreators({addTodo, getTodos}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
