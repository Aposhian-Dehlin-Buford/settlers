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
      <EndTurnButton />
      <DiceButton />
      <MyHand />
      <Dice  />
      <Map />
    </div>
  )
}

export default Game
