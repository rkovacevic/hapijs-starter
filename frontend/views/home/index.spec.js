import {Home} from '.'
import {shallowRender} from '../../utils/testUtils'
import {expect} from 'chai'
import {Jumbotron} from 'react-bootstrap'
import {findWithType, findAllWithType} from 'react-shallow-testutils'
import Todos from '../todos'

describe('frontend home view', () => {

    it('renders jumbotron when not logged in', () => {
        const component = shallowRender(Home, { className: 'MyComponent' })
        expect(findWithType(component, Jumbotron)).to.exist
    })

    it('renders welcome when logged in', () => {
        const component = shallowRender(Home, { className: 'MyComponent', user: { username: 'test' } })
        expect(findWithType(component, Todos)).to.exist
        expect(findAllWithType(component, Jumbotron).length).to.equal(0)
    })
})
