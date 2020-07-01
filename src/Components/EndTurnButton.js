import React, { useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { UserContext } from "../context/UserContext"
import {endFirstTurn, endSecondTurn} from '../redux/gameReducer'

const EndTurnButton = () => {
  const { socket } = useContext(UserContext)
  const {
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
        (rolledDice || (firstTurn && firstSettlementPlaced && firstRoadPlaced) || (secondTurn && secondSettlementPlaced && secondRoadPlaced)) &&
        !tradePending && (
          <button
            onClick={() => {
              socket.emit("end-turn", { room })
              firstTurn ? dispatch(endFirstTurn()) :
              secondTurn && dispatch(endSecondTurn())
            }}
          >
            End Turn
          </button>
        )}
    </div>
  )
}

export default EndTurnButton
