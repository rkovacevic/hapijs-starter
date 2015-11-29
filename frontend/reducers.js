import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import api from './services/api/reducers'
import register from './views/register/reducers'
import auth from './views/login/reducers'

export default combineReducers({
    api,
    register,
    auth,
    router: routerStateReducer
})
