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
  SET_GAME_STATE: "SET_GAME_STATE",
  UPDATE_RESOURCES: "UPDATE_RESOURCES",
  UPDATE_ACTIVE_PLAYER: "UPDATE_ACTIVE_PLAYER",
  SET_MAP_STATE: "SET_MAP_STATE",
  SET_ROLLED_DICE: "SET_ROLLED_DICE",
  UPDATE_DICE_RESULT: "UPDATE_DICE_RESULT",
}
export default actionTypes
