import React, { useEffect } from "react"
import axios from "axios"
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
  updateDevelopmentDeck,
  endGame,
  updateBuildings,
} from "../redux/gameReducer"
import MyHand from "./MyHand"
import EndTurnButton from "./EndTurnButton"
import DiceButton from "./DiceButton"
import OfferTrade from "./OfferTrade"
import IncomingTrade from "./IncomingTrade"
import Dice from "./Dice/Dice"
import "./Dice/Dice.scss"
import Purchase from "./Purchase"
import DevelopmentDeck from "./DevelopmentDeck"
import { useHistory } from "react-router-dom"

const Game = () => {
  const { push } = useHistory()
  const dispatch = useDispatch()
  const { socket } = useSelector(({ authReducer }) => authReducer)
  const {
    incomingTrade,
    active,
    rolledDice,
    tradePending,
    buildSettlement,
    buildings,
  } = useSelector(({ gameReducer }) => gameReducer)
  useEffect(() => {
    socket.on("disconnect", () => {
      dispatch(endGame())
      axios.post("/auth/logout").then(() => {
        push("/")
      })
    })
    socket.on("opponent-left", () => {
      dispatch(endGame())
      axios.post("/auth/logout").then(() => {
        socket.emit("leave")
        push("/")
      })
    })
    socket.on("pass-turn", () => dispatch(updateActivePlayer()))
    socket.on("dice-result", ({ diceResult }) =>
      dispatch(updateDiceResult(diceResult))
    )
    socket.on("request-trade", (body) => dispatch(updateIncomingTrade(body)))
    socket.on("accept-offer", (body) => {
      const { offer, request, room } = body
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

    socket.on("reject-offer", () => dispatch(updateTradePending(false)))
    socket.on("buy-card", ({ deck }) => dispatch(updateDevelopmentDeck(deck)))
    socket.on("buy-building", ({ building }) =>
      dispatch(updateBuildings(building))
    )
  }, [socket])
  console.log(buildings)
  return (
    <div className="game-container">
      <div className="top-container">
        {buildSettlement ? <div className="top-container-overlay"></div> : null}
        {active && rolledDice && !tradePending && <OfferTrade />}
        {active && rolledDice && !tradePending && <Purchase />}
        {incomingTrade && <IncomingTrade />}
      </div>
      <div className="middle-container">
        <div className="p3-container"></div>
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
          <DevelopmentDeck />
          <div className="dice-container">
            <DiceButton />
            <Dice />
          </div>
        </div>
        <Map />
        <EndTurnButton />
        <div className="p4-container"></div>
      </div>
      <div className="bottom-container">
        <MyHand />
      </div>
    </div>
  )
}

export default Game
