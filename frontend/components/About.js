import React, { Component } from 'react';
import 'bootstrap-webpack'
import { Panel, Button } from 'react-bootstrap';

export default class About extends Component {
  render() {
    return (
        <div>
        <Panel id="main-panel">
            <h1>About.</h1>
            <Button bsStyle="primary" bsSize="large">OK, excellent</Button>
        </Panel>
        </div>
    );
  }
}