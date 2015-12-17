import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {connect} from 'react-redux'
import Todos from '../todos'

export class Home extends React.Component {

    render() {

        return (
            <div>
                { this.props.user === undefined ?
                <Jumbotron>
                    <h1>Hello, world!</h1>
                    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <p>
                        <LinkContainer to="/register">
                            <Button bsStyle="primary" bsSize="large">Register</Button>
                        </LinkContainer>
                    </p>
                </Jumbotron>
                :
                <div>
                    <Todos></Todos>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.app.user
})

export default connect(mapStateToProps)(Home)
