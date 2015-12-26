import React, {Component} from 'react'
import {Navbar, NavBrand, NavItem, NavDropdown, Nav, MenuItem, Panel, Button, Input} from 'react-bootstrap'
import {Link} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {loadUserData, logout} from './actions'


export class App extends React.Component {

    componentDidMount() {
        this.props.loadUserData()
    }

    render() {
        return (
            <div>
                <div style={{display: this.props.loadingUserData ? 'block' : 'none'}}>
                    <div className="spinner vertical-center">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
                <div style={{display: this.props.loadingUserData ? 'none' : 'block'}}>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">TODO App</Link>
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
                                        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
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

const mapDispatchToProps = dispatch => {
    return bindActionCreators({loadUserData, logout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
