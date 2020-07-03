import React, { useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { UserContext } from "../context/UserContext"
import {endFirstTurn, endSecondTurn} from '../redux/gameReducer'

const EndTurnButton = () => {
  const { socket } = useContext(UserContext)
  const {
    turn,
    active,
    room,
    rolledDice,
    tradePending,
    buildSettlement,
    firstTurn,
    firstSettlementPlaced,
    firstRoadPlaced,
    secondTurn,
    secondSettlementPlaced,
    secondRoadPlaced,
  } = useSelector((redux) => redux)
  const dispatch = useDispatch()
  return (
    <div className="end-button-container">
      {!buildSettlement &&
        active &&
        (rolledDice || (turn===1 && firstSettlementPlaced && firstRoadPlaced) || (turn===2 && secondSettlementPlaced && secondRoadPlaced)) &&
        !tradePending && (
          <button
            onClick={() => {
              socket.emit("end-turn", { room })
              // firstTurn ? dispatch(endFirstTurn()) :
              // secondTurn && dispatch(endSecondTurn())
            }}
          >
            End Turn
          </button>
        )}
    </div>
  )
}

export default EndTurnButton
