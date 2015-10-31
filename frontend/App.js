import React, { Component } from 'react';
import 'bootstrap-webpack'
import { Panel, Button } from 'react-bootstrap';
import './App.css'

export default class App extends Component {
  render() {
    return (
        <Panel id="main-panel">
            <h1>Hello, world.</h1>
            <Button bsStyle="primary" bsSize="large">OK, excellent</Button>
        </Panel>
    );
  }
}