import '../../utils/setupFakeDOM'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {shallowRender} from '../../utils/testUtils'
import {Login} from '.'
import {expect} from 'chai'
import {findWithType, findAllWithType, findWithRef} from 'react-shallow-testutils'
import {Input, ButtonInput} from 'react-bootstrap'
import {spy} from 'sinon'

describe('frontend login view', () => {

    it('renders form', () => {
        const component = shallowRender(Login, {})
        expect(findWithRef(component, 'username')).to.exist
        expect(findWithRef(component, 'password')).to.exist
        expect(findWithType(component, ButtonInput)).to.exist
    })

    it('renders validation errors', () => {
        const component = shallowRender(Login, {
            validationErrors: [
                {
                    path: 'username',
                    message: 'username error'
                },
                {
                    path: 'password',
                    message: 'password error'
                }

            ]
        })
        expect(findWithRef(component, 'username').props.bsStyle).to.equal('error')
        expect(findWithRef(component, 'username').props.help).to.equal('username error')
        expect(findWithRef(component, 'password').props.bsStyle).to.equal('error')
        expect(findWithRef(component, 'password').props.help).to.equal('password error')
    })

    it('form submit works', () => {
        const login = spy()

        const tree = TestUtils.renderIntoDocument(<Login login={login} />)
        const component = TestUtils.findRenderedComponentWithType(tree, Login)

        component.refs.username.getInputDOMNode().value = 'testuser'
        component.refs.password.getInputDOMNode().value = 'testpass'

        TestUtils.Simulate.submit(component.refs.form)

        expect(login.getCall(0).args[0]).to.deep.equal({
            username: 'testuser',
            password: 'testpass'
        })
    })
})
