import React, { useEffect, useContext } from "react"
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

const resources = {
  clay: 0,
  wheat: 0,
  rock: 0,
  sheep: 0,
  wood: 0
}

const Game = () => {
  const { push } = useHistory()
  const dispatch = useDispatch()
  // const {user} = useContext(UserContext)
  const { user } = useSelector(({ authReducer }) => authReducer)
  const { socket } = useSelector(({ authReducer }) => authReducer)
  const {
    incomingTrade,
    active,
    rolledDice,
    tradePending,
    buildSettlement,
    map,
  } = useSelector(({ gameReducer }) => gameReducer)
  console.log(map)
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
    socket.on("dice-result", ({ diceResult }) => {
      // console.log('testing')
      // console.log(diceResult)
      // console.log('test')
      // console.log(map)
      map.forEach((e) => {
        // console.log(e)
        if (e.number === diceResult[0] + diceResult[1]) {
          // console.log(e.number)
          for (let key in e.slots) {
            if (
              (e.slots[key][3] === 1 || e.slots[key][3] === 2) &&
              e.slots[key][4] === user.user_id
            ) {
              // console.log("TEST")
              // console.log(e)
              // console.log(e.slots[key])
              dispatch(updateResources({ ...resources, [e.terrain]: e.slots[key][3] }))
            }
          }
        }
        // e.slots.forEach(el => {
        //   if(el[3] === 1 && el[4] === user.user_id){
        //     console.log(el)
        //   }
        // })
      })
      dispatch(updateDiceResult(diceResult))
    })
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
    socket.on("buy-building", ({ buildingsArray, map }) => {
      dispatch(setMapState(map))
      dispatch(updateBuildings(buildingsArray))
    })
  }, [socket])
  // console.log(buildings)
  return (
    <div className="game-container">
      <div className="top-container">
        {buildSettlement && <div className="top-container-overlay"></div>}
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
