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
                    <p>
                        This is a simple TODO app demo, built with:</p>
                    <ul>
                        <li>Node</li>
                        <li>Hapi</li>
                        <li>React</li>
                        <li>Redux</li>
                        <li>Sequelize</li>
                        <li>ES6</li>
                        <li>Babel</li>
                        <li>Webpack</li>
                        <li>Mocha + Chai + Sinon</li>
                    </ul>
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
