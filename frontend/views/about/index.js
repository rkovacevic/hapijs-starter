import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class About extends React.Component {

    render() {
        return (
            <div>
                <h1>About</h1>
                <p>Created by Robert Kovačević</p>
                <Button href="/documentation" target="_blank" bsStyle="info" bsSize="large">API documentation</Button>
            </div>
        )
    }
}

export default About
