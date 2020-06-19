import React, {useContext} from "react"
import { useSelector } from "react-redux"
import {UserContext} from '../context/UserContext'

const EndTurnButton = () => {
  const {socket} = useContext(UserContext)
  // const { socket } = useSelector(({ authReducer }) => authReducer)
  const {
    active,
    room,
    rolledDice,
    tradePending,
    buildSettlement,
  } = useSelector(({ gameReducer }) => gameReducer)
  return (
    <div className="end-button-container">
      {!buildSettlement && active && rolledDice && !tradePending && (
        <button
          onClick={() => {
            socket.emit("end-turn", { room })
          }}
        >
          End Turn
        </button>
      )}
    </div>
  )
}

export default EndTurnButton
