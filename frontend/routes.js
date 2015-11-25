import React from 'react'
import {IndexRoute, Route} from 'react-router'

import App from './containers/App'
import Home from './containers/Home'
import About from './containers/About'
import Register from './containers/Register'
import NotFound from './containers/NotFound'


export default (
    <Route path="/" component={App}>
      	<IndexRoute component={Home}/>
      	<Route path="about" component={About}/>
      	<Route path="register" component={Register}/>
      	<Route path="*" component={NotFound}/>
   	</Route>
)
