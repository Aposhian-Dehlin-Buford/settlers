import actionTypes from "./actionTypes"
// import UserList from "../Components/UserList"
const {
  SET_GAME_STATE,
  UPDATE_ACTIVE_PLAYER,
  SET_ROLLED_DICE,
  UPDATE_DICE_RESULT,
  UPDATE_TRADE_PENDING,
  UPDATE_INCOMING_TRADE
} = actionTypes

const initialState = {
  active: false,
  gameStart: false,
  rolledDice: false,
  diceResult: [0, 0],
  tradePending: false,
  incomingTrade: null
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

export function setRolledDice() {
  return { type: SET_ROLLED_DICE }
}

export function updateDiceResult(payload) {
  return { type: UPDATE_DICE_RESULT, payload }
}

export function updateTradePending(payload){
  return {type: UPDATE_TRADE_PENDING, payload}
}

export function updateIncomingTrade(payload){
  return {type: UPDATE_INCOMING_TRADE, payload}
}

export default function gameReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_GAME_STATE:
      return { ...payload }
    case UPDATE_ACTIVE_PLAYER:
      return { ...state, active: !state.active, rolledDice: false }
    case SET_ROLLED_DICE:
      return { ...state, rolledDice: true }
    case UPDATE_DICE_RESULT:
      return { ...state, diceResult: payload }
    case UPDATE_TRADE_PENDING:
      return {...state, tradePending: payload}
    case UPDATE_INCOMING_TRADE:
      return {...state, incomingTrade: payload}
    default:
      return state
  }
}
