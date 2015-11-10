import React, { Component } from 'react'
import 'bootstrap-webpack'
import { Input, ButtonInput } from 'react-bootstrap'
import { Panel, Button } from 'react-bootstrap'

export default React.createClass({

    updateState() {

    },

    onSubmit(e) {
        e.preventDefault()
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
                    <Input name="username" type="text" label="Username" bsStyle={styles.username} help={helps.username} placeholder="Enter username" onBlur={this.updateState} />
                    <Input name="password" type="password" label="Password" placeholder="Enter password" bsStyle={styles.password} help={helps.password} onBlur={this.updateState} />
                    <ButtonInput type="submit" value="Login" bsSize="large" bsStyle="primary"/>
                </form>
            </Panel>
            </div>
        );
    }
})