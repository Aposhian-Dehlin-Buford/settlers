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
  setPickCard,
  setPick31,
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
  const {
    turn,
    incomingTrade,
    active,
    rolledDice,
    tradePending,
    buildSettlement,
    buildCity,
    buildings,
    firstTurn,
    secondTurn,
    diceResult,
    pickCard,
    pick31,
    map,
    roads
  } = useSelector((redux) => redux)
  console.log({turn})
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
      dispatch(updateActivePlayer())
    })
    socket.on("buy-building", ({ buildingsArray, newMap }) => {
      buildingRef.current = !buildingRef.current
      dispatch(setMapState(newMap))
      dispatch(updateBuildings(buildingsArray))
    })
    socket.on("buy-road", ({ roadsArray, newMap }) => {
      dispatch(setMapState(newMap))
      dispatch(updateRoads(roadsArray))
    })
    socket.on("dice-result", ({ diceResult }) => {
      dispatch(updateDiceResult(diceResult))
    })
  }, [])

  // useEffect(() => {

  // }, [])

  useEffect(() => {
    const newBuildings = [...buildings]
    newBuildings.forEach((e) => {
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
  }, [diceResult])

  // useEffect(() => {

  // }, [socket, dispatch])

  const handlePort = (e, id) => {
    // console.log("HANDLEPORT", e.type)
    e.type === "3 for 1"
      ? dispatch(setPick31(true))
      : dispatch(setPickCard(true))
    dispatch(
      updateResources({
        ...resources,
        [e.type]: resources[e.type] - (e.type === "3 for 1" ? 3 : 2),
      })
    )
  }

  const handlePickCard = (card) => {
    // console.log("HANDLE-PICK-CARD", card)
    dispatch(setPickCard(false))
    dispatch(updateResources({ ...resources, [card]: 1 }))
  }

  const handlePick31 = (card) => {
    // console.log("HANDLE_PICK_31", card)
    dispatch(setPick31(false))
    dispatch(setPickCard(true))
    dispatch(updateResources({ ...resources, [card]: -3 }))
  }

  // console.log("map", map)
  // console.log("buildings", buildings)
  // console.log("roads", roads)

  return (
    <div className="game-container">
      <div className="top-container">
        {/* {(buildSettlement || buildCity) && (
          <div className="top-container-overlay"></div>
        )} */}
        {active && rolledDice && !tradePending && !firstTurn && !secondTurn && (
          <OfferTrade />
        )}
        {active && rolledDice && !tradePending && !firstTurn && !secondTurn && (
          <Purchase />
        )}
        {incomingTrade && <IncomingTrade />}
        {<MyDevelopmentHand />}
      </div>
      <div className="middle-container">
        <div className="p3-container"></div>
        <div className="res-dice-container">
          <div className="res-container">
            <div className="res-4">
              <div
                className="wheat"
                onClick={pickCard ? () => handlePickCard("wheat") : null}
              ></div>
              <div
                className="sheep"
                onClick={pickCard ? () => handlePickCard("sheep") : null}
              ></div>
              <div
                className="wood"
                onClick={pickCard ? () => handlePickCard("wood") : null}
              ></div>
            </div>
            <div className="res-3">
              <div
                className="clay"
                onClick={pickCard ? () => handlePickCard("clay") : null}
              ></div>
              <div
                className="rock"
                onClick={pickCard ? () => handlePickCard("rock") : null}
              ></div>
            </div>
          </div>
          <DevelopmentDeck />
          <div className="dice-container">
            {turn>2 && <DiceButton />}
            <Dice />
          </div>
        </div>
        <Map handlePort={handlePort} />
        <EndTurnButton />
        <div className="p4-container"></div>
      </div>
      <div className="bottom-container">
        <MyHand handlePick31={handlePick31} />
      </div>
    </div>
  )
}

export default Game
