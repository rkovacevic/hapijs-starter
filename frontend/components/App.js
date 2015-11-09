import React, { Component } from 'react'
import 'bootstrap-webpack'
import { Navbar, NavBrand, NavItem, NavDropdown, Nav, MenuItem, Panel, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import './App.css'

export default React.createClass({

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