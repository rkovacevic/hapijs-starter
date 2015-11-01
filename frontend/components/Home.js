import React, { Component } from 'react';
import 'bootstrap-webpack'
import { Panel, Button } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
        <div>
        <Panel id="main-panel">
            <h1>Hello, world.</h1>
            <Button bsStyle="primary" bsSize="large">OK, excellent</Button>
        </Panel>
        </div>
    );
  }
}