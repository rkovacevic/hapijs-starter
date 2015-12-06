import React from 'react'
import TestUtils from 'react-addons-test-utils'

export function shallowRender(element, props) {
    const shallowRenderer = TestUtils.createRenderer()
    shallowRenderer.render(React.createElement(element, props))
    let component = shallowRenderer.getRenderOutput()
    return component
}
