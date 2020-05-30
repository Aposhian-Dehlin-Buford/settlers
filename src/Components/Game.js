import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Map from "./Map/Map"
import "./Map/Map.scss"
import "./Game.scss"
import {
  updateActivePlayer,
  updateDiceResult,
  updateIncomingTrade,
  updateTradePending,
  updateResources,
} from "../redux/gameReducer"
import MyHand from "./MyHand"
import EndTurnButton from "./EndTurnButton"
import DiceButton from "./DiceButton"
import OfferTrade from "./OfferTrade"
import IncomingTrade from "./IncomingTrade"
import Dice from "./Dice/Dice"
import "./Dice/Dice.scss"
import Purchase from "./Purchase"

const Game = () => {
  const dispatch = useDispatch()
  const { socket } = useSelector(({ authReducer }) => authReducer)
  const { incomingTrade, active, rolledDice, tradePending } = useSelector(({ gameReducer }) => gameReducer)
  useEffect(() => {
    socket.on("pass-turn", () => dispatch(updateActivePlayer()))
    socket.on("dice-result", ({ diceResult }) =>
      dispatch(updateDiceResult(diceResult))
    )
    socket.on("request-trade", (body) => {
      dispatch(updateIncomingTrade(body))
    })
    socket.on("accept-offer", (body) => {
      const {offer, request, room} = body
      dispatch(
        updateResources({
          wood: request.forWood - offer.offerWood,
          clay: request.forClay - offer.offerClay,
          wheat: request.forWheat - offer.offerWheat,
          sheep: request.forSheep - offer.offerSheep,
          rock: request.forRock - offer.offerRock,
        })
      )
      dispatch(updateTradePending(false))
    })

    socket.on("reject-offer", () => {
      dispatch(updateTradePending(false))
    })
  }, [socket])
  return (
    <div className="game-container">
      {/* <EndTurnButton /> */}
      {/* <DiceButton /> */}
      {/* <MyHand /> */}
      {/* <Dice /> */}
      {active && rolledDice && !tradePending && <OfferTrade />}
      {active && rolledDice && !tradePending && <Purchase />}
      {incomingTrade && <IncomingTrade />}
      {/* <Map /> */}
      <div className="top-container"></div>
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
            <Dice />
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
