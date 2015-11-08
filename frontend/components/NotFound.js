import React, { Component } from 'react'
import 'bootstrap-webpack'
import { Well, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class NotFound extends Component {
  render() {
    return (
        <div>
            <Well>
                <h1>Not found</h1>
                <LinkContainer to="/">
                    <Button bsStyle="primary" bsSize="large">Go back</Button>
                </LinkContainer>
            </Well>
        </div>
    )
  }
}