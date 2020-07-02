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
  SET_PICK_CARD,
  SET_PICK_31,
  UPDATE_BUILDINGS,
  UPDATE_ROADS,
  SET_MAP_STATE,
  END_FIRST_TURN,
  FIRST_SETTLEMENT_PLACED,
  FIRST_ROAD_PLACED,
  END_SECOND_TURN,
  SECOND_SETTLEMENT_PLACED,
  SECOND_ROAD_PLACED,
} = actionTypes

const initialState = {
  active: false,
  gameStart: false,
  buildSettlement: false,
  buildRoad: false,
  buildCity: false,
  pickCard: false,
  pick31: false,
  rolledDice: false,
  diceResult: [0, 0],
  tradePending: false,
  firstTurn: true,
  secondTurn: true,
  firstSettlementPlaced: false,
  secondSettlementPlaced: false,
  firstRoadPlaced: false,
  secondRoadPlaced: false,
  incomingTrade: null,
  buildings: [...Array(20)].map(e => [...Array(6)].map((f,j) => j)),
  roads: [...Array(20)].map(e => [...Array(6)].map((f,j) => j)),
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

export function endFirstTurn() {
  return {
    type: END_FIRST_TURN,
    payload: false,
  }
}
export function endSecondTurn() {
  return {
    type: END_SECOND_TURN,
    payload: false,
  }
}

export function placeFirstSettlement(){
  console.log('hit place first settlement')
  return {
    type: FIRST_SETTLEMENT_PLACED,
    payload: true
  }
}
export function placeSecondSettlement(){
  return {
    type: SECOND_SETTLEMENT_PLACED,
    payload: true
  }
}
export function placeFirstRoad(){
  return {type: FIRST_ROAD_PLACED, payload: true}
}

export function placeSecondRoad(){
  return {type: SECOND_ROAD_PLACED, payload: true}
}

export function setMapState(payload) {
  return { type: SET_MAP_STATE, payload }
}

export function updateActivePlayer() {
  return { type: UPDATE_ACTIVE_PLAYER }
}

export function setRolledDice() {
  return { type: SET_ROLLED_DICE }
}

export function updateDiceResult(payload) {
  console.log("updateDiceResult", payload)
  return { type: UPDATE_DICE_RESULT, payload }
}

export function updateTradePending(payload) {
  return { type: UPDATE_TRADE_PENDING, payload }
}

export function updateIncomingTrade(payload) {
  return { type: UPDATE_INCOMING_TRADE, payload }
}

export function updateResources(payload) {
  console.log("updateResources", payload)
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

export function setBuildSettlement(payload) {
  return { type: SET_BUILD_SETTLEMENT, payload }
}

export function setBuildRoad(payload) {
  return { type: SET_BUILD_ROAD, payload }
}

export function setBuildCity(payload) {
  return { type: SET_BUILD_CITY, payload }
}

export function setPickCard(payload){
  return {type: SET_PICK_CARD, payload}
}

export function setPick31(payload){
  return {type: SET_PICK_31, payload}
}

export function updateBuildings(payload){
  return {type: UPDATE_BUILDINGS, payload}
}

export function updateRoads(payload) {
  return { type: UPDATE_ROADS, payload }
}

export default function gameReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_GAME_STATE:
      return { ...payload }
    case END_FIRST_TURN:
      return {...state, firstTurn: payload}
    case END_SECOND_TURN:
      return {...state, secondTurn: payload}
    case FIRST_SETTLEMENT_PLACED:
      return {...state, firstSettlementPlaced: payload}
    case SECOND_SETTLEMENT_PLACED:
      return {...state, secondSettlementPlaced: payload}
    case FIRST_ROAD_PLACED:
      return {...state, firstRoadPlaced: payload}
    case SECOND_ROAD_PLACED:
      return {...state, secondRoadPlaced: payload}
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
      return { ...state, developmentDeck: payload }
    case UPDATE_DEVELOPMENT_HAND:
      return { ...state, developmentHand: payload }
    case END_GAME:
      return { ...payload }
    case SET_BUILD_SETTLEMENT:
      return { ...state, buildSettlement: payload }
    case SET_BUILD_ROAD:
      return { ...state, buildRoad: payload }
    case SET_BUILD_CITY:
      return {...state, buildCity: payload}
    case SET_PICK_CARD:
      return {...state, pickCard: payload}
    case SET_PICK_31:
      return {...state, pick31: payload}
    case UPDATE_BUILDINGS:
      return { ...state, buildings: payload }
      break
    case UPDATE_ROADS:
      return { ...state, roads: payload }
    case SET_MAP_STATE:
      return { ...state, map: payload }
      break
    default:
      return state
  }
}
