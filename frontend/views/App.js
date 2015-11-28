import React, { Component } from 'react'
import 'bootstrap-webpack'
import { Navbar, NavBrand, NavItem, NavDropdown, Nav, MenuItem, Panel, Button, Input } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import './App.css'
import api from '../services/api'

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: undefined
        }

        this.updateUser = this.updateUser.bind(this)
    }

    updateUser() {
        api.get('/api/users/me')
        .then(user => {
            this.setState({user: user})
        })
        .catch(error => {
            this.setState({user: undefined})
        })
    }

    componentDidMount() {
        this.updateUser()
    }

    render() {
        return (
            <div>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">React-Bootstrap</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to="/login">
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                        </Nav>
                        <Nav>
                            <LinkContainer to="/" onlyActiveOnIndex={true}>
                                <NavItem>Home</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <NavItem>About</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
