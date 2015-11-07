import React, { Component } from 'react'
import 'bootstrap-webpack'
import { Input, ButtonInput } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// This is a demonstration of a form with client and server
// side validation. In general, you would be much better off
// to use a library like 'newforms', but here we do it 
// manually, as a learning excersize. 
export default class Register extends Component {
    
    constructor() {
        super()
        
        let that = this

        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            validationErrors: {},
            _dirty: false
        }

        this.updateState = function() {
            that.setState({
                username: that.refs.username.getValue(),
                password: that.refs.password.getValue(),
                repeatPassword: that.refs.repeatPassword.getValue(),
                validationErrors: {},
                _dirty: true
            })
        }

        this.onSubmit = function(e) {
            e.preventDefault()
            console.log('on sub')
            that.setState({ validationErrors: {
                username: "bla"
            }});
        }
    }

    render() {
        let validationErrors = this.state.validationErrors;
        let styles = {}
        if (this.state._dirty) {
            if (this.state.username.length === 0) validationErrors.username = 'You need to enter a username'
            if (this.state.password.length === 0) validationErrors.password = 'You need to enter a password'
            if (this.state.password !== this.state.repeatPassword) validationErrors.repeatPassword = 'Passwords need to match'
            for (let err in validationErrors) styles[err] = 'error'
        }

        return (
            <div>
                <h1>Register a new user</h1>
                <form onSubmit={this.onSubmit}>
                    <Input ref="username" type="text" label="Username" bsStyle={styles.username} help={validationErrors.username} placeholder="Enter username" onBlur={this.updateState} />
                    <Input ref="password" type="password" label="Password" placeholder="Enter password" onBlur={this.updateState} />
                    <Input ref="repeatPassword" type="password" label="Reapeat password" placeholder="Enter the same password again" onBlur={this.updateState} />
                    <ButtonInput type="submit" value="Submit" bsSize="large" bsStyle="primary"/>
                </form>
            </div>
        )
    }
}