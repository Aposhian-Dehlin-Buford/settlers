import React from "react"
import { useSelector } from "react-redux"

const EndTurnButton = () => {
  const { socket } = useSelector(({ authReducer }) => authReducer)
  const { active, room, rolledDice } = useSelector(({ gameReducer }) => gameReducer)
  return (
    <div>
      {active && rolledDice && (
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
