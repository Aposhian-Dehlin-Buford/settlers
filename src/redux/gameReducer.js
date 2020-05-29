import actionTypes from './actionTypes'
const {SET_GAME_STATE, UPDATE_ACTIVE_PLAYER} = actionTypes

const initialState = {}

export function setGameState(payload){
    return{type: SET_GAME_STATE, payload}
}

export default function gameReducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_GAME_STATE:
            return {...payload}
        default:
            return state
    }
}