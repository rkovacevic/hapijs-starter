import React, { Component } from 'react'
import 'bootstrap-webpack'
import { Navbar, NavBrand, NavItem, NavDropdown, Nav, MenuItem, Panel, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import './App.css'
import api from '../services/api'

export default React.createClass({
    
    childContextTypes: {
        getUser: React.PropTypes.object,
        updateUser: React.PropTypes.func
    },

    getChildContext: function() {
        return {
            getUser: this.state.user,
            updateUser: this.updateUser
        }
    },

    getInitialState() {
        return {
            user: undefined
        }
    },

    updateUser() {
        console.log('setting user')
        api.all('users').get('me').then((user) => {
            console.log(user)
            this.setState({user: user})
        }).catch((error) => {
            this.setState({user: undefined})
        })
    },

    componentDidMount() {
        this.updateUser()
    },

    render() {
        return (
            <div>
                <Navbar>
                    <NavBrand><Link to="/">React-Bootstrap</Link></NavBrand>
                    <Nav>
                        <LinkContainer to="/" onlyActiveOnIndex={true}>
                            <NavItem>Home</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <NavItem>About</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
})