import actionTypes from "./actionTypes"
const {
  SET_GAME_STATE,
  UPDATE_ACTIVE_PLAYER,
  SET_ROLLED_DICE,
  UPDATE_DICE_RESULT,
  UPDATE_TRADE_PENDING,
  UPDATE_INCOMING_TRADE,
  UPDATE_RESOURCES,
  UPDATE_DEVELOPMENT_DECK,
  UPDATE_DEVELOPMENT_HAND,
  END_GAME,
  SET_BUILD_SETTLEMENT,
  UPDATE_BUILDINGS,
} = actionTypes

const initialState = {
  active: false,
  gameStart: false,
  buildSettlement: false,
  rolledDice: false,
  diceResult: [0, 0],
  tradePending: false,
  incomingTrade: null,
  buildings: [],
  developmentDeck: [],
  developmentHand: [],
  map: [],
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

export function updateTradePending(payload) {
  return { type: UPDATE_TRADE_PENDING, payload }
}

export function updateIncomingTrade(payload) {
  return { type: UPDATE_INCOMING_TRADE, payload }
}

export function updateResources(payload) {
  return { type: UPDATE_RESOURCES, payload }
}

export function updateDevelopmentDeck(payload) {
  return { type: UPDATE_DEVELOPMENT_DECK, payload: payload }
}

export function updateDevelopmentHand(payload) {
  return { type: UPDATE_DEVELOPMENT_HAND, payload: payload }
}

export function endGame() {
  return { type: END_GAME, payload: initialState }
}

export function setBuildSettlement(payload){
  return {type: SET_BUILD_SETTLEMENT, payload}
}

export function updateBuildings(payload){
  return {type: UPDATE_BUILDINGS, payload}
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
      return { ...state, tradePending: payload }
    case UPDATE_INCOMING_TRADE:
      return { ...state, incomingTrade: payload }
    case UPDATE_RESOURCES:
      return {
        ...state,
        resources: {
          wood: state.resources.wood + payload.wood,
          clay: state.resources.clay + payload.clay,
          wheat: state.resources.wheat + payload.wheat,
          sheep: state.resources.sheep + payload.sheep,
          rock: state.resources.rock + payload.rock,
        },
      }
    case UPDATE_DEVELOPMENT_DECK:
      return { ...state, developmentDeck: payload }
    case UPDATE_DEVELOPMENT_HAND:
      return { ...state, developmentHand: payload }
    case END_GAME:
      return { ...payload }
    case SET_BUILD_SETTLEMENT:
      return {...state, buildSettlement: payload}
    case UPDATE_BUILDINGS:
      return {...state, buildings: [...state.buildings, payload]}
    default:
      return state
  }
}
