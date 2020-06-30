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
  SET_BUILD_ROAD,
  SET_BUILD_CITY,
  UPDATE_BUILDINGS,
  UPDATE_ROADS,
  SET_MAP_STATE
} = actionTypes

const initialState = {
  active: false,
  gameStart: false,
  buildSettlement: false,
  buildRoad: false,
  buildCity: false,
  rolledDice: false,
  diceResult: [0, 0],
  tradePending: false,
  incomingTrade: null,
  buildings: [...Array(20)].map(e => [...Array(6)].map((f,j) => j)),
  roads: [...Array(20)].map(e => [...Array(6)].map((f,j) => j)),
  numBuildings: [],
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

export function setMapState(payload) {
  console.log(payload)
  return {type: SET_MAP_STATE, payload}
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
  console.log(payload)
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

export function setBuildRoad(payload){
  return {type: SET_BUILD_ROAD, payload}
}

export function setBuildCity(payload){
  return {type: SET_BUILD_CITY, payload}
}

export function updateBuildings(payload){
  return {type: UPDATE_BUILDINGS, payload}
}

export function updateRoads(payload){
  return {type: UPDATE_ROADS, payload}
}

export default function gameReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_GAME_STATE:
      // console.log("CASE HIT", type, payload)
      return { ...payload }
    case UPDATE_ACTIVE_PLAYER:
      // console.log("CASE HIT", type, payload)
      return { ...state, active: !state.active, rolledDice: false }
    case SET_ROLLED_DICE:
      // console.log("CASE HIT", type, payload)
      return { ...state, rolledDice: true }
    case UPDATE_DICE_RESULT:
      // console.log("CASE HIT", type, payload)
      return { ...state, diceResult: payload }
    case UPDATE_TRADE_PENDING:
      // console.log("CASE HIT", type, payload)
      return { ...state, tradePending: payload }
    case UPDATE_INCOMING_TRADE:
      // console.log("CASE HIT", type, payload)
      return { ...state, incomingTrade: payload }
    case UPDATE_RESOURCES:
      // console.log("CASE HIT", type, payload)
      return {
        ...state,
        // resources: payload
        resources: {
          wood: state.resources.wood + payload.wood,
          clay: state.resources.clay + payload.clay,
          wheat: state.resources.wheat + payload.wheat,
          sheep: state.resources.sheep + payload.sheep,
          rock: state.resources.rock + payload.rock,
        },
      }
    case UPDATE_DEVELOPMENT_DECK:
      // console.log("CASE HIT", type, payload)
      return { ...state, developmentDeck: payload }
    case UPDATE_DEVELOPMENT_HAND:
      // console.log("CASE HIT", type, payload)
      return { ...state, developmentHand: payload }
    case END_GAME:
      // console.log("CASE HIT", type, payload)
      return { ...payload }
    case SET_BUILD_SETTLEMENT:
      // console.log("CASE HIT", type, payload)
      return {...state, buildSettlement: payload}
    case SET_BUILD_ROAD:
      // console.log("CASE HIT", type, payload)
      return {...state, buildRoad: payload}
    case SET_BUILD_CITY:
      // console.log("CASE HIT", type, payload)
      return {...state, buildCity: payload}
    case UPDATE_BUILDINGS:
      // console.log("CASE HIT", type, payload)
      return {...state, buildings: payload}
    case UPDATE_ROADS:
      // console.log("CASE HIT", type, payload)
      return {...state, roads: payload}
    case SET_MAP_STATE:
      // console.log("CASE HIT", type, payload)
      return {...state, map: payload}
    default:
      return state
  }
}
