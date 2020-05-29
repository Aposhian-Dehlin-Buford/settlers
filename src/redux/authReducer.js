import actionTypes from "./actionTypes"
const { SET_USER, SET_SOCKET } = actionTypes

const initialState = {
  user: {},
  socket: null,
}

export function setUser(payload) {
  return { type: SET_USER, payload }
}
export function setSocket(payload) {
  return { type: SET_SOCKET, payload }
}

export default function authReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_USER:
      return { ...state, user: payload }
    case SET_SOCKET:
      return { ...state, socket: payload }
    default:
      return state
  }
}
