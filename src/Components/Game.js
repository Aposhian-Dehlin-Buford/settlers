import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Map from "./Map/Map"
import "./Map/Map.scss"
import "./Game.scss"
import { updateActivePlayer, updateDiceResult, updateIncomingTrade, updateTradePending } from "../redux/gameReducer"
import MyHand from "./MyHand"
import EndTurnButton from "./EndTurnButton"
import DiceButton from "./DiceButton"
import Dice from "./Dice/Dice"
import OfferTrade from "./OfferTrade"
import IncomingTrade from "./IncomingTrade"

const Game = () => {
  const dispatch = useDispatch()
  const { socket } = useSelector(({ authReducer }) => authReducer)
  const {incomingTrade} = useSelector(({gameReducer}) => gameReducer)
  useEffect(() => {
    socket.on("pass-turn", () => dispatch(updateActivePlayer()))
    socket.on("dice-result", ({ diceResult }) =>
      dispatch(updateDiceResult(diceResult))
    )
    socket.on('request-trade', (body) => {
      dispatch(updateIncomingTrade(body))
    })
    socket.on('accept-offer', (body) => {
      console.log(body)
      dispatch(updateTradePending(false))
    })

    socket.on('reject-offer', () => {
      dispatch(updateTradePending(false))
    })
  }, [socket])
  return (
    <div className="game-container">
      <EndTurnButton />
      <DiceButton />
      <MyHand />
      <Dice />
      <OfferTrade />
      {incomingTrade && <IncomingTrade />}
      <Map />
    </div>
  )
}

export default Game
