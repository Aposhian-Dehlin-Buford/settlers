const actionTypes = {
  //USER ACTIONS
  SET_USER: "SET_USER",
  GET_USER: "GET_USER",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",

  //SOCKET ACTIONS
  SET_SOCKET: "SET_SOCKET",

  //MIDDLEWARE STATE TYPES
  PENDING: "_PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "_REJECTED",

  //GAME ACTIONS
  UPDATE_VICTORY_POINTS: "UPDATE_VICTORY_POINTS",
  END_FIRST_TURN: "END_FIRST_TURN,",
  END_SECOND_TURN: "END_SECOND_TURN",
  FIRST_SETTLEMENT_PLACED: "FIRST_SETTLEMENT_PLACED",
  SECOND_SETTLEMENT_PLACED: "SECOND_SETTLEMENT_PLACED",
  FIRST_ROAD_PLACED: "FIRST_ROAD_PLACED",
  SECOND_ROAD_PLACED: "SECOND_ROAD_PLACED",
  SET_GAME_STATE: "SET_GAME_STATE",
  UPDATE_RESOURCES: "UPDATE_RESOURCES",
  UPDATE_ACTIVE_PLAYER: "UPDATE_ACTIVE_PLAYER",
  SET_MAP_STATE: "SET_MAP_STATE",
  SET_ROLLED_DICE: "SET_ROLLED_DICE",
  UPDATE_DICE_RESULT: "UPDATE_DICE_RESULT",
  UPDATE_TRADE_PENDING: "UPDATE_TRADE_PENDING",
  UPDATE_INCOMING_TRADE: "UPDATE_INCOMING_TRADE",
  // UPDATE_RESOURCES: "UPDATE_RESOURCES",
  UPDATE_DEVELOPMENT_DECK: "UPDATE_DEVELOPMENT_DECK",
  UPDATE_DEVELOPMENT_HAND: "UPDATE_DEVELOPMENT_HAND",
  END_GAME: "END_GAME",
  SET_BUILD_SETTLEMENT: "SET_BUILD_SETTLEMENT",
  SET_BUILD_ROAD: "SET_BUILD_ROAD",
  SET_BUILD_CITY: "SET_BUILD_CITY",
  SET_PICK_CARD: "SET_PICK_CARD",
  SET_PICK_DISCARD: "SET_PICK_DISCARD",
  SET_PICK_31: "SET_PICK_31",
  YEAR_OF_PLENTY: "YEAR_OF_PLENTY",
  MONOPOLY: "MONOPOLY",
  UPDATE_BUILDINGS: "UPDATE_BUILDINGS",
  UPDATE_ROADS: "UPDATE_ROADS",
  SET_PLACE_ROBBER: "SET_PLACE_ROBBER",
  SET_OPPOSING_MONOPOLY: "SET_OPPOSING_MONOPOLY",
  SET_FACE_UP_KNIGHTS: "SET_FACE_UP_KNIGHTS",
  SET_ENEMY_FACE_UP_KNIGHTS: "SET_ENEMY_FACE_UP_KNIGHTS",
  SET_ENEMY_RESOURCES: "SET_ENEMY_RESOURCES",
  SET_ENEMY_DEV_CARDS: "SET_ENEMY_DEV_CARDS",
}
export default actionTypes
