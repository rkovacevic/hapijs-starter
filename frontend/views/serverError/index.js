import React, { Component } from 'react'
import { Well, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class NotFound extends React.Component {

    render() {
        return (
            <div>
                <Well>
                    <h1>Not found</h1>
                    <p>Nothing here, buddy, keep walking.</p>
                    <LinkContainer to="/">
                        <Button bsStyle="primary" bsSize="large">Go back</Button>
                    </LinkContainer>
                </Well>
            </div>
        )
    }
}
