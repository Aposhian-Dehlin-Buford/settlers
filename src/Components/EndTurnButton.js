import React, { useContext, useRef, useEffect } from "react"
import { TweenMax, Linear } from 'gsap'
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

  const canSee = (!buildSettlement &&
  active &&
  (rolledDice || (turn===1 && firstSettlementPlaced && firstRoadPlaced) || (turn===2 && secondSettlementPlaced && secondRoadPlaced)) &&
  !tradePending)

  let endRef = useRef(null)

  useEffect(() => {
    if(canSee){
      TweenMax.to(endRef, 1, {
        opacity: 1
      })
      TweenMax.to(endRef, 17, {
        rotation:360, 
        ease:Linear.easeNone, 
        repeat:-1})
    }
  }, [canSee])

  if(canSee){
    return (
        <div 
          className="end-button-container" 
          ref={el => {endRef = el}}>
            <button
              onClick={() => {
                socket.emit("end-turn", { room })
                // firstTurn ? dispatch(endFirstTurn()) :
                // secondTurn && dispatch(endSecondTurn())
              }}
            >
              End Turn
            </button>
          
        </div>
    )
  } else {
    return null
  }
}

export default EndTurnButton
