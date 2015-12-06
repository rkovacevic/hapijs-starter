import {NotFound} from '.'
import {shallowRender} from '../../utils/testUtils'
import {expect} from 'chai'
import {findWithType, findAllWithType} from 'react-shallow-testutils'

describe('frontend not found view', () => {

    it('renders not found', () => {
        const component = shallowRender(NotFound, { className: 'MyComponent' })
        expect(findWithType(component, 'h1').props.children).to.equal('Not found')
    })

})
