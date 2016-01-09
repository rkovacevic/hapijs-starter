import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/lib/createBrowserHistory'
import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {reduxReactRouter, routerStateReducer, ReduxRouter} from 'redux-router'
import createLogger from 'redux-logger'
import 'bootstrap-webpack'

import {polyfill} from 'es6-promise'
polyfill()

import api from './middleware/api'
import reducers from './reducers'
import routes from './routes'

let initialState = {
    validationErrors: null
}

let middleware = [thunk, api]

if (__DEV__) middleware.push(createLogger())

const store = compose(
    applyMiddleware(...middleware),
    reduxReactRouter({
        routes,
        createHistory
    })
)(createStore)(reducers)

let node =
<Provider store={store}>
    <ReduxRouter>
        {routes}
    </ReduxRouter>
</Provider>

ReactDOM.render(node, document.getElementById('root'))
