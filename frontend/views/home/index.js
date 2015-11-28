import React, { Component } from 'react'
import { Panel, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Home extends React.Component {

    render() {

        return (
            <div>
            <Panel id="main-panel">
                <h1>Hello, world.</h1>
                <LinkContainer to="/register">
                    <Button bsStyle="primary" bsSize="large">Register</Button>
                </LinkContainer>
            </Panel>
            </div>
        );
    }
}
