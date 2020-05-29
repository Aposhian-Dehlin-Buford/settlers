import actionTypes from "./actionTypes"
import UserList from "../Components/UserList"
const { SET_GAME_STATE, UPDATE_ACTIVE_PLAYER } = actionTypes

const initialState = {
  active: false,
  gameStart: false,
}

export function setGameState(payload, user_id) {
  return {
    type: SET_GAME_STATE,
    payload: {
      ...payload,
      active:
        payload.players[payload.activePlayer].user_id === user_id
          ? true
          : false,
    },
  }
}

export function updateActivePlayer() {
  return { type: UPDATE_ACTIVE_PLAYER }
}

export default function gameReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_GAME_STATE:
      return { ...payload }
    case UPDATE_ACTIVE_PLAYER:
      return { ...state, active: !state.active }
    default:
      return state
  }
}
