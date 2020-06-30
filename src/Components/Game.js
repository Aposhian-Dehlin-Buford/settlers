import React, { useEffect, useContext, useRef, useCallback } from "react"
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
  setMapState,
  updateRoads,
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
import { UserContext } from "../context/UserContext"
import MyDevelopmentHand from "./MyDevelopmentHand"
import { GiKaleidoscopePearls } from "react-icons/gi"

const resources = {
  clay: 0,
  wheat: 0,
  rock: 0,
  sheep: 0,
  wood: 0,
}

const Game = () => {
  const buildingRef = useRef(true)
  const { push } = useHistory()
  const dispatch = useDispatch()
  const { user, socket } = useContext(UserContext)
  // const mapRef = useRef(false)
  const {
    incomingTrade,
    active,
    rolledDice,
    tradePending,
    buildSettlement,
    buildCity,
    buildRoad,
    map,
    buildings,
    roads,
    // resources,
  } = useSelector((redux) => redux)
  const rollingDice = useCallback(({ diceResult }) => {
    console.log(diceResult)
    dispatch(updateDiceResult(diceResult))
    const newBuildings = [...buildings]
    buildings.forEach((e) => {
      e.forEach((f) => {
        if (f.adjacent_numbers && f.user_id === user.user_id) {
          f.adjacent_numbers.forEach((g) => {
            if (g && g.number === diceResult[0] + diceResult[1]) {
              dispatch(
                updateResources({
                  ...resources,
                  [g.terrain]: resources[g.terrain] + f.building_type,
                })
              )
            }
          })
        }
      })
    })
  }, [buildingRef.current])
  useEffect(() => {
    socket.on("disconnect", () => {
      dispatch(endGame())
      axios.post("/auth/logout").then(() => {
        push("/")
      })
    })
    socket.on("opponent-left", () => {
      dispatch(endGame())
    })
  }, [])
  useEffect(() => {
    console.log("building ref: " + buildingRef.current)
    socket.on("dice-result", rollingDice)
  }, [])

  useEffect(() => {
    socket.on("buy-card", ({ deck }) => dispatch(updateDevelopmentDeck(deck)))
    socket.on("request-trade", (body) => dispatch(updateIncomingTrade(body)))
    socket.on("reject-offer", () => dispatch(updateTradePending(false)))
    socket.on("accept-offer", (body) => {
      const { offer, request } = body
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
    socket.on("pass-turn", () => {
      console.log("turn passed")
      dispatch(updateActivePlayer())
    })
    socket.on("buy-building", ({ buildingsArray, newMap }) => {
      console.log("hit buy building")
      buildingRef.current = !buildingRef.current
      console.log(buildingsArray)
      console.log(newMap)
      dispatch(setMapState(newMap))
      dispatch(updateBuildings(buildingsArray))
    })
    socket.on("buy-road", ({ roadsArray, newMap }) => {
      dispatch(setMapState(newMap))
      dispatch(updateRoads(roadsArray))
    })
  }, [])

  return (
    <div className="game-container">
      <div className="top-container">
        {(buildSettlement || buildCity) && (
          <div className="top-container-overlay"></div>
        )}
        {active && rolledDice && !tradePending && <OfferTrade />}
        {active && rolledDice && !tradePending && <Purchase />}
        {incomingTrade && <IncomingTrade />}
        {<MyDevelopmentHand />}
      </div>
      <div className="middle-container">
        <div className="p3-container"></div>
        <div className="res-dice-container">
          <div className="res-container">
            <div className="res-4">
              <div className="wheat"></div>
              <div className="sheep"></div>
              <div className="wood"></div>
            </div>
            <div className="res-3">
              <div className="clay"></div>
              <div className="rock"></div>
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
