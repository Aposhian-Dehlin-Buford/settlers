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
    pickDiscard,
  } = useSelector((redux) => redux)
  const dispatch = useDispatch()

  const canSee = (!buildSettlement &&
  active &&
  (rolledDice || (turn===1 && firstSettlementPlaced && firstRoadPlaced) || (turn===2 && secondSettlementPlaced && secondRoadPlaced)) &&
  !tradePending)

  let endRef = useRef(null)

  useEffect(() => {
    if(canSee){
      TweenMax.to(endRef, .01, {
        opacity: 0
      })
      TweenMax.to(endRef, 1, {
        opacity: 1
      })
      TweenMax.to(endRef, 6, {
        rotation: 720, 
        ease: "linear",
        repeat:-1})
    }
  }, [canSee])

    return (
        <div 
          className="end-button-container">
            <div className="end-button-animation" style={{background: canSee ? "linear-gradient(rgba(0, 100, 0, 0.13), green, lightgreen, green, rgba(144, 238, 144, 0.089))" : "transparent"}} ref={el => {endRef = el}}></div>
            {!canSee && <div className="end-turn-overlay"></div>}
            <button
              onClick={() => {
                socket.emit("end-turn", { room })
                // firstTurn ? dispatch(endFirstTurn()) :
                // secondTurn && dispatch(endSecondTurn())
              }}
            >
              {
                pickDiscard ? "Discard" : <span>{"End\nTurn"}</span>
              }
            </button>
          
        </div>
    )
}

export default EndTurnButton
