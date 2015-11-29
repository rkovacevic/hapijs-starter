import React, { Component } from 'react'
import 'bootstrap-webpack'
import { Navbar, NavBrand, NavItem, NavDropdown, Nav, MenuItem, Panel, Button, Input } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import {connect} from 'react-redux'
import './App.css'
import { loadUserData, logout } from './actions'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(loadUserData())
    }

    logout() {
        this.props.dispatch(logout())
    }

    render() {
        return (
            <div>
                <div style={{display: this.props.loadingUserData ? 'block' : 'none'}}>
                    <p>Loading...</p>
                </div>
                <div style={{display: this.props.loadingUserData ? 'none' : 'block'}}>
                    <Navbar inverse>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">React-Bootstrap</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>

                        <Navbar.Collapse>
                            <Nav pullRight>
                                { this.props.user === undefined ?
                                    <LinkContainer to="/login">
                                        <NavItem>Login</NavItem>
                                    </LinkContainer>
                                    :
                                    <NavDropdown title={this.props.user.username} id="user-dropdown">
                                        <MenuItem onClick={this.logout}>Logout</MenuItem>
                                    </NavDropdown>
                                }
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.app.user,
    loadingUserData: state.app.loadingUserData
})

export default connect(mapStateToProps)(App)
