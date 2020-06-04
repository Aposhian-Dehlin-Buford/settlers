import React from "react"
import { useSelector } from "react-redux"

const EndTurnButton = (props) => {
  const {buildSettlement, setBuildSettlement} = props
  const { socket } = useSelector(({ authReducer }) => authReducer)
  const { active, room, rolledDice, tradePending } = useSelector(({ gameReducer }) => gameReducer)
  return (
    <div className="end-button-container">
      {
        buildSettlement ? <div className="end-turn-overlay"></div> : null
      }
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
