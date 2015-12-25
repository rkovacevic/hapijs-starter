import React, { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'

class About extends React.Component {

    render() {
        return (
            <div>
                <h1>About</h1>
                <p>Created by Robert Kovačević</p>
                <ButtonToolbar>
                    <Button href="/documentation" target="_blank" bsStyle="info" bsSize="large">API documentation</Button>
                    <Button href="http://github.com/rkovacevic/hapijs-starter" target="_blank" bsStyle="info" bsSize="large">Code on Github</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

export default About
