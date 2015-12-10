import '../../utils/setupFakeDOM'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {shallowRender} from '../../utils/testUtils'
import {Register} from '.'
import {expect} from 'chai'
import {findWithType, findAllWithType, findWithRef} from 'react-shallow-testutils'
import {Input, ButtonInput} from 'react-bootstrap'
import {spy} from 'sinon'

describe('frontend register view', () => {

    it('renders form', () => {
        const component = shallowRender(Register, {})
        expect(findWithRef(component, 'username')).to.exist
        expect(findWithRef(component, 'password')).to.exist
        expect(findWithRef(component, 'repeatPassword')).to.exist
        expect(findWithType(component, ButtonInput)).to.exist
    })

    it('renders validation errors', () => {
        const component = shallowRender(Register, {
            validationErrors: [
                {
                    path: 'username',
                    message: 'username error'
                },
                {
                    path: 'password',
                    message: 'password error'
                },
                {
                    path: 'repeatPassword',
                    message: 'repeat password error'
                }
            ]
        })
        expect(findWithRef(component, 'username').props.bsStyle).to.equal('error')
        expect(findWithRef(component, 'username').props.help).to.equal('username error')
        expect(findWithRef(component, 'password').props.bsStyle).to.equal('error')
        expect(findWithRef(component, 'password').props.help).to.equal('password error')
        expect(findWithRef(component, 'repeatPassword').props.bsStyle).to.equal('error')
        expect(findWithRef(component, 'repeatPassword').props.help).to.equal('repeat password error')
    })

    it('form submit works', () => {
        const registerUser = spy()

        const tree = TestUtils.renderIntoDocument(<Register registerUser={registerUser} />)
        const component = TestUtils.findRenderedComponentWithType(tree, Register)

        component.refs.username.getInputDOMNode().value = 'testuser'
        component.refs.password.getInputDOMNode().value = 'testpass'
        component.refs.repeatPassword.getInputDOMNode().value = 'testpass'

        TestUtils.Simulate.submit(component.refs.form)

        expect(registerUser.getCall(0).args[0]).to.deep.equal({
            username: 'testuser',
            password: 'testpass',
            repeatPassword: 'testpass'
        })
    })
})
