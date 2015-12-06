import About from '.'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {expect} from 'chai'

describe('frontend about view', () => {

    it('renders', () => {
        const shallowRenderer = TestUtils.createRenderer()
        shallowRenderer.render(React.createElement(About, { className: 'MyComponent' }))
        const component = shallowRenderer.getRenderOutput()

        expect(component.props.children[0]).to.deep.equal(<h1>About</h1>)
    })
})
