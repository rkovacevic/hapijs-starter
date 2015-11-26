import React from 'react'
import 'bootstrap-webpack'
import {Input, ButtonInput} from 'react-bootstrap'
import {connect} from 'react-redux'
import {registerUser} from '../actions/register'

export class Register extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: {
                value: '',
                dirty: false,
                errorMessage: undefined
            },
            password: {
                value: '',
                dirty: false,
                errorMessage: undefined
            },
            repeatPassword: {
                value: '',
                dirty: false,
                errorMessage: undefined
            }
        }

        this.updateState = this.updateState.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    updateState(e) {
        let stateUpdate = {}
        stateUpdate[e.target.name] = {
            value: e.target.value,
            dirty: true,
            errorMessage: undefined
        }
        this.setState(stateUpdate)
    }

    onSubmit(e) {
        e.preventDefault()

        this.props.dispatch(registerUser({
            username: this.state.username.value,
            password: this.state.password.value
        }))
    }

    render() {
        let styles = {}
        let helps = {}

        if (this.state.username.dirty && this.state.username.value.length < 5) {
            helps.username = 'You need to enter a username, at least 5 characters long'
            styles.username = 'error';
        }

        if (this.state.password.dirty && this.state.password.value.length < 5) {
            helps.password = 'You need to enter a password, at least 5 characters long'
            styles.password = 'error'
        }

        if (this.state.repeatPassword.dirty && this.state.repeatPassword.value !== this.state.password.value) {
            helps.repeatPassword = 'Passwords need to match'
            styles.repeatPassword = 'error'
        }

        if (this.state.username.errorMessage !== undefined) {
            helps.username = this.state.username.errorMessage
            styles.username = 'error'
        }

        if (this.state.password.errorMessage !== undefined) {
            helps.password = this.state.password.errorMessage
            styles.password = 'error'
        }

        if (this.state.repeatPassword.errorMessage !== undefined) {
            helps.repeatPassword = this.state.repeatPassword.errorMessage
            styles.repeatPassword = 'error'
        }

        return (
            <div>
                <h1>Register a new user</h1>
                <form onSubmit={this.onSubmit}>
                    <Input name="username" type="text" label="Username" bsStyle={styles.username} help={helps.username} placeholder="Enter username" onBlur={this.updateState} />
                    <Input name="password" type="password" label="Password" placeholder="Enter password" bsStyle={styles.password} help={helps.password} onBlur={this.updateState} />
                    <Input name="repeatPassword" type="password" label="Reapeat password" placeholder="Enter the same password again" bsStyle={styles.repeatPassword} help={helps.repeatPassword} onBlur={this.updateState} />
                    <ButtonInput type="submit" value="Submit" bsSize="large" bsStyle="primary"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    validationErrors: state.validationErrors
})

export default connect(mapStateToProps)(Register)
