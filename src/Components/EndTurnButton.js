import React from "react"
import { useSelector } from "react-redux"

const EndTurnButton = () => {
  const { socket } = useSelector(({ authReducer }) => authReducer)
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
