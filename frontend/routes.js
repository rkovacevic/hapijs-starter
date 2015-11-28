import React from 'react'
import {IndexRoute, Route} from 'react-router'

import App from './views/App'
import Home from './views/home'
import About from './views/about'
import Register from './views/register'
import NotFound from './views/notFound'


export default (
    <Route path="/" component={App}>
      	<IndexRoute component={Home}/>
      	<Route path="about" component={About}/>
      	<Route path="register" component={Register}/>
      	<Route path="*" component={NotFound}/>
   	</Route>
)
