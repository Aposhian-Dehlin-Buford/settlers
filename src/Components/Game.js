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
    map,
    buildings,
    // resources,
  } = useSelector((redux) => redux)
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
  }, [socket, dispatch, push])
  useEffect(() => {
    // socket.on("dice-result", ({ diceResult }) => {
    //   map.forEach((e) => {
    //     if (e.number === diceResult[0] + diceResult[1]) {
    //       for (let key in e.slots) {
    //         if (
    //           (e.slots[key][3] === 1 || e.slots[key][3] === 2) &&
    //           e.slots[key][4] === user.user_id
    //         ) {
    //           dispatch(
    //             updateResources({ ...resources, [e.terrain]: e.slots[key][3] })
    //           )
    //         }
    //       }
    //     }
    //   })
    //   dispatch(updateDiceResult(diceResult))
    // })

    //


    // socket.on("dice-result", ({ diceResult }) => {
    //   map.forEach((e) => e.slots.forEach((f) => {
    //     // console.log("f", f)
    //     for(let i = 0; i < 3; i++){
    //       if(f[i] && f[i].number === diceResult[0] + diceResult[1]) {
    //         console.log("map", map)
    //         console.log("f", f)
    //         console.log("f[i]", f[i])
    //         console.log("f[i].number", f[i].number)
    //         console.log("f[3] and f[4]", f[3], f[4])
    //         if (f[3]){
    //           console.log("HIT", f[3], f[4], f[i].terrain)
    //           {
    //             dispatch(
    //               updateResources({ ...resources, [f[i].terrain]: f[i].terrain })
    //             )
    //           }
    //         }
    //       }
    //     }

    //   }))
    //   dispatch(updateDiceResult(diceResult))
    // })

    //

    socket.on("dice-result", ({ diceResult }) => {
      console.log('hit')
      buildings.forEach(e => {
        e.forEach(f => {
          if(f.adjacent_numbers){
            // console.log("DING")
            let res = f.adjacent_numbers.filter(g => g.number === diceResult[0] + diceResult[1]).map(m => m.terrain)
            // console.log("res", res)
              res.forEach(k => {
                {
                  dispatch(
                    updateResources({ ...resources, [k]: resources[k]+1})
                  )
                }
              })
          }
        })
      })
      dispatch(updateDiceResult(diceResult))
    })

    // console.log("resources", resources)





    // socket.on("buy-building", ({ buildingsArray, newMap }) => {
    //   dispatch(setMapState(newMap))
    //   dispatch(updateBuildings(buildingsArray))
    //   // mapRef required to force re-render when the map updates
    //   // mapRef.current = !mapRef.current
    // })
  }, [socket, dispatch, user.user_id, buildings])
  
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
    socket.on("pass-turn", () => dispatch(updateActivePlayer()))
    socket.on("buy-building", ({ buildingsArray, newMap }) => {
      dispatch(setMapState(newMap))
      dispatch(updateBuildings(buildingsArray))
    })
  }, [dispatch, socket])

  // console.log("map", map)
  // console.log("buildings", buildings)

  return (
    <div className="game-container">
      <div className="top-container">
        {buildSettlement && <div className="top-container-overlay"></div>}
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
