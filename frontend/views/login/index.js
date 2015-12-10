import React from 'react'
import {Input, ButtonInput} from 'react-bootstrap'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {login} from './actions'

export class Login extends React.Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.login({
            username: this.refs.username.getValue(),
            password: this.refs.password.getValue()
        })
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
                <h1>Login</h1>
                <form ref="form" onSubmit={this.onSubmit}>
                    <Input
                        ref="username"
                        type="text"
                        label="Username"
                        bsStyle={styles.username}
                        help={helps.username}
                        placeholder="Enter username" />
                    <Input
                        ref="password"
                        type="password" label="Password"
                        placeholder="Enter password"
                        bsStyle={styles.password}
                        help={helps.password} />
                    <ButtonInput
                        type="submit"
                        value="Login"
                        bsSize="large"
                        bsStyle="primary" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    validationErrors: state.auth.validationErrors
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({login}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
