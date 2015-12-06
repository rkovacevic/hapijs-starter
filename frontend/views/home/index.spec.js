import {Home} from '.'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {expect} from 'chai'

describe('frontend home view', () => {

    it('renders jumbotron when not logged in', () => {
        const shallowRenderer = TestUtils.createRenderer()
        shallowRenderer.render(React.createElement(Home, { className: 'MyComponent' }))
        const component = shallowRenderer.getRenderOutput()
        console.dir(component.props.children.type)
        expect(component.props.children.type.displayName).to.equal('Jumbotron')
    })

    it('renders welcome when logged in', () => {
        const shallowRenderer = TestUtils.createRenderer()
        shallowRenderer.render(React.createElement(Home, { className: 'MyComponent', user: { username: 'test' } }))
        const component = shallowRenderer.getRenderOutput()
        console.dir(component)
        expect(component.props.children.props.children.type).to.equal('h1')
    })
})
