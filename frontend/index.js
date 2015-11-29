import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/lib/createBrowserHistory'
import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {reduxReactRouter, routerStateReducer, ReduxRouter} from 'redux-router'
import createLogger from 'redux-logger'

import {polyfill} from 'es6-promise'
polyfill()

import reducers from './reducers'
import routes from './routes'

let initialState = {
    validationErrors: null
}

const store = compose(
    applyMiddleware(thunk, createLogger()),
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
