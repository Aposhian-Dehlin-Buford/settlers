import React from "react"
import { useSelector } from "react-redux"

const EndTurnButton = () => {
  const { socket } = useSelector(({ authReducer }) => authReducer)
  const { active, room, rolledDice, tradePending } = useSelector(({ gameReducer }) => gameReducer)
  console.log({tradePending})
  console.log({active})
  console.log({rolledDice})
  return (
    <div>
      {active && rolledDice && !tradePending && (
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
