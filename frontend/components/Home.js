import React, { Component } from 'react'
import 'bootstrap-webpack'
import { Input, ButtonInput } from 'react-bootstrap'
import { Panel, Button } from 'react-bootstrap'
import api from '../services/api'

export default React.createClass({

    contextTypes: {
        updateUser: React.PropTypes.func
    },

    updateState() {

    },

    onSubmit(e) {
        e.preventDefault()
        api.all('users/login').post({
            username: this.refs.username.getValue(),
            password: this.refs.password.getValue()
        })
        .then(result => {
            console.log(result)
            this.context.updateUser()
            //this.context.history.pushState(undefined, '/')
        })
        .catch(error => {
            console.log('catch')
            console.dir(error)
        })
    },

    render() {
        let styles = {}
        let helps = {}

        return (
            <div>
            <Panel id="main-panel">
                <h1>Hello, world.</h1>
                <Button bsStyle="primary" bsSize="large">OK, excellent</Button>
                <hr/>

                <form onSubmit={this.onSubmit}>
                    <Input ref="username" type="text" label="Username" bsStyle={styles.username} help={helps.username} placeholder="Enter username" onBlur={this.updateState} />
                    <Input ref="password" type="password" label="Password" placeholder="Enter password" bsStyle={styles.password} help={helps.password} onBlur={this.updateState} />
                    <ButtonInput type="submit" value="Login" bsSize="large" bsStyle="primary"/>
                </form>
            </Panel>
            </div>
        );
    }
})