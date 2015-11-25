import React from 'react'
import ReactDOM from 'react-dom'
import {Router, IndexRoute, Route, Link, History} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import {polyfill} from 'es6-promise'
polyfill()

import App from './containers/App'
import Home from './containers/Home'
import About from './containers/About'
import Register from './containers/Register'
import NotFound from './containers/NotFound'

const history = createBrowserHistory()

let node =
    <Router history={history}>
    	<Route path="/" component={App}>
	      	<IndexRoute component={Home}/>
	      	<Route path="about" component={About}/>
	      	<Route path="register" component={Register}/>
	      	<Route path="*" component={NotFound}/>
    	</Route>
  	</Router>

ReactDOM.render(node, document.getElementById('root'))
