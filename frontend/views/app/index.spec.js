import {App} from '.'
import React from 'react'
import {shallowRender} from '../../utils/testUtils'
import {expect} from 'chai'
import {findWithType, findAllWithType} from 'react-shallow-testutils'
import {NavItem, MenuItem} from 'react-bootstrap'
import TestUtils from 'react-addons-test-utils'
import {spy} from 'sinon'


describe('frontend app view', () => {

    it('renders login button', () => {
        const component = shallowRender(App, {
            user: undefined,
            loadingUserData: false
        })
        expect(findAllWithType(component, NavItem)[0].props.children).to.equal('Login')
    })

    it('renders logout button if logged in', () => {
        const component = shallowRender(App, {
            user: {
                username: 'test'
            },
            loadingUserData: false
        })
        expect(findAllWithType(component, MenuItem)[0].props.children).to.equal('Logout')
    })

    it('calls loadUserData', () => {
        const loadUserData = spy()
        const tree = TestUtils.renderIntoDocument(<App loadUserData={loadUserData} />)
        expect(loadUserData.getCall(0)).to.exist
    })
})
