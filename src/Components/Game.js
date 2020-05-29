import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Map from "./Map/Map"
import "./Map/Map.scss"
import "./Game.scss"
import { updateActivePlayer, updateDiceResult } from "../redux/gameReducer"
import MyHand from "./MyHand"
import EndTurnButton from "./EndTurnButton"
import DiceButton from "./DiceButton"
import Dice from './Dice/Dice'
import './Dice/Dice.scss'

const Game = () => {
  const dispatch = useDispatch()
  const { socket } = useSelector(({ authReducer }) => authReducer)
  useEffect(() => {
    socket.on("pass-turn", () => dispatch(updateActivePlayer()))
    socket.on('dice-result', ({diceResult}) => {
        dispatch(updateDiceResult(diceResult))})
  }, [socket])

  return (
    <div className="game-container">
        <div className="top-container">

        </div>
        <div className="middle-container">
            <div className="p3-container">P3</div>
            <div className="res-dice-container">
                <div className="res-container">
                    <div className="res-4">
                        <div className="wheat">Wheat</div>
                        <div className="sheep">Sheep</div>
                        <div className="wood">Wood</div>
                    </div>
                    <div className="res-3">
                        <div className="clay">Clay</div>
                        <div className="rock">Rock</div>
                    </div>
                </div>
                <div className="dice-container">
                    <DiceButton />
                    <Dice  />
                </div>
            </div>
            <Map />
            <div className="p4-container">P4</div>


        </div>
        <div className="bottom-container">
            <MyHand />
            <EndTurnButton />

        </div>
    </div>
  )
}

export default Game
