import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import register from './views/register/reducers'
import auth from './views/login/reducers'

export default combineReducers({
    register,
    auth,
    router: routerStateReducer
})
