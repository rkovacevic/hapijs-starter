import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/lib/createBrowserHistory'
import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {reduxReactRouter, routerStateReducer, ReduxRouter} from 'redux-router'

import {polyfill} from 'es6-promise'
polyfill()

import reducers from './reducers'
import routes from './routes'

const store = compose(
    applyMiddleware(thunk),
    reduxReactRouter({
        routes,
        createHistory
    })
)(createStore)(reducers);

let node =
    <Provider store={store}>
		<ReduxRouter>
	    	{routes}
	  	</ReduxRouter>
  	</Provider>

ReactDOM.render(node, document.getElementById('root'))
