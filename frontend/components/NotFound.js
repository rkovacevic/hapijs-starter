import React, { Component } from 'react';
import 'bootstrap-webpack'
import { Well } from 'react-bootstrap';

export default class NotFound extends Component {
  render() {
    return (
        <div>
            <Well>
                <h1>Not found</h1>
            </Well>
        </div>
    );
  }
}