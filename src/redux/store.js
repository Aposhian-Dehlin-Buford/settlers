import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
// import authReducer from './authReducer'
import gameReducer from './gameReducer'

// const reducers = combineReducers({gameReducer})

export default createStore(gameReducer, applyMiddleware(promiseMiddleware))