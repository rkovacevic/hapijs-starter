import {combineReducers} from 'redux'
import {routerStateReducer} from 'redux-router'
import auth from './auth'
import register from './register'

export default combineReducers({
    auth,
    register,
    router: routerStateReducer
})
