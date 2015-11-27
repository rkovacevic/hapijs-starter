import React from 'react'
import {Input, ButtonInput} from 'react-bootstrap'
import {connect} from 'react-redux'
import {registerUser} from './actions'

export class Register extends React.Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.dispatch(registerUser({
            username: this.refs.username.getValue(),
            password: this.refs.password.getValue(),
            repeatPassword: this.refs.repeatPassword.getValue()
        }))
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
                <h1>Register a new user</h1>
                <form onSubmit={this.onSubmit}>
                    <Input ref="username" type="text" label="Username" bsStyle={styles.username} help={helps.username} placeholder="Enter username" zindex={1} />
                    <Input ref="password" type="password" label="Password" placeholder="Enter password" bsStyle={styles.password} help={helps.password} zindex={2} />
                    <Input ref="repeatPassword" type="password" label="Reapeat password" placeholder="Enter the same password again" bsStyle={styles.repeatPassword} help={helps.repeatPassword} zindex={3} />
                    <ButtonInput type="submit" value="Submit" bsSize="large" bsStyle="primary" zindex={4} />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    validationErrors: state.register.validationErrors
})

export default connect(mapStateToProps)(Register)
