import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import authReducer from './authReducer'
import gameReducer from './gameReducer'

const reducers = combineReducers({authReducer, gameReducer})

export default createStore(reducers, applyMiddleware(promiseMiddleware))