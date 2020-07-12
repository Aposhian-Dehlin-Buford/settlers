import React, { useEffect, useContext, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setRolledDice } from '../redux/gameReducer'
import {GiRollingDices} from 'react-icons/gi'
import {UserContext} from '../context/UserContext'
import Dice from './Dice/Dice'
import {TweenMax} from 'gsap'

const DiceButton = () => {
    const dispatch = useDispatch()
    const {socket} = useContext(UserContext)
    const { active, turn, rolledDice, room, firstTurn, secondTurn } = useSelector((redux) => redux)

    let endRef = useRef(null)

    useEffect(() => {
      if(active && !rolledDice && turn > 2){
        TweenMax.to(endRef, .001, {
          opacity: 0
        })
        TweenMax.to(endRef, 1, {
          opacity: 1
        })
        TweenMax.to(endRef, 5, {
          rotation: 720, 
          ease: "linear",
          repeat:-1})
        }
    }, [active])

    let canRoll = (active && !rolledDice && turn > 2)

    const handleDice = () => {
      socket.emit("roll-dice", { room })
      dispatch(setRolledDice())
    }

    return (
        <div className="roll-dice-container">
          {!canRoll && <div className="end-turn-overlay"></div>}
          {/* {(active && !rolledDice && turn > -1) && <div className="end-button-animation" ref={el => {endRef = el}}></div>} */}
          <div className="end-button-animation" style={{background: canRoll ? "linear-gradient(rgba(0, 100, 0, 0.13), green, lightgreen, green, rgba(144, 238, 144, 0.089))" : "transparent"}} ref={el => {endRef = el}}></div>
               <div className="roll-dice-button"
               onClick={canRoll ? handleDice : null}
                >
          <GiRollingDices color={"white"} />
        </div>
                <Dice canRoll={canRoll} handleDice={handleDice} />
        </div>
    )
}

export default DiceButton