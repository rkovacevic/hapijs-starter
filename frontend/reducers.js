import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import register  from './views/register/reducers'

export default combineReducers({
    register,
    router: routerStateReducer
})
