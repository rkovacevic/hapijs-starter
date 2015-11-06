import React, { Component } from 'react';
import 'bootstrap-webpack'
import { Input, ButtonInput } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Register extends Component {
    
    constructor() {
        super();
        this.validate = this.validate.bind(this);
    }
    
    validate () {
        console.log('validation');
        console.log(this);
        this.setState( {} );
        //console.log(this.refs.username.getValue());
    }
    
    render() {
        console.log(this);
        return (
            <div>
                <h1>Register new user</h1>
                <form>
                    <Input ref="username" type="text" label="Username" placeholder="Enter username" onBlur={this.validate} />
                    <Input ref="password" type="password" label="Password" placeholder="Enter password" onBlur={this.validate} />
                    <Input ref="repeatPassword" type="password" label="Reapeat password" placeholder="Enter the same password again" onBlur={this.validate} />
                    <ButtonInput type="submit" value="Submit" bsSize="large" bsStyle="primary"/>
                </form>
            </div>
        );
    }
}