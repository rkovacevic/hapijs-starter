import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export class NotFound extends React.Component {

    render() {
        return (
            <div>
                <h1>Not found</h1>
                <p>Nothing here, buddy, keep walking.</p>
                <LinkContainer to="/">
                    <Button bsStyle="primary" bsSize="large">Go back</Button>
                </LinkContainer>
            </div>
        )
    }
}

export default NotFound
