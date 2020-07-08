import React, { useState, useEffect, useContext, useRef, useCallback } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import Map from "./Map/Map"
import "./Map/Map.scss"
import "./Game.scss"
import "./LeftContainer.scss"
import "./MiddleContainer.scss"
import "./RightContainer.scss"
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
  setPickDiscard,
  setPlaceRobber,
  setMonopoly,
  setOpposingMonopoly,
  updateEnemyKnights,
  updateEnemyDevCards,
  setRobberLocation,
  updateEnemyResources,
} from "../redux/gameReducer"
import MyHand from "./MyHand"
import EndTurnButton from "./EndTurnButton"
import DiceButton from "./DiceButton"
import OfferTrade from "./OfferTrade"
import IncomingTrade from "./IncomingTrade"
import Dice from "./Dice/Dice"
import StealFrom from './StealFrom'
import OpponentHand from './OpponentHand'
import "./Dice/Dice.scss"
import Purchase from "./Purchase"
import DevelopmentDeck from "./DevelopmentDeck"
import { useHistory } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import MyDevelopmentHand from "./MyDevelopmentHand"
import EnemyPlayer from "./EnemyPlayer"

const newResources = {
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
    room,
    turn,
    incomingTrade,
    active,
    rolledDice,
    tradePending,
    buildSettlement,
    buildCity,
    buildings,
    firstTurn,
    resources,
    secondTurn,
    diceResult,
    pickCard,
    yearOfPlentyDev,
    pick31,
    map,
    roads,
    monopolyDev,
    opposingMonopoly,
    robberLocation,
    enemyPlayersInfo,
  } = useSelector((redux) => redux)

  const [stealFrom, setStealFrom] = useState([])
  useEffect(() => {
    if (opposingMonopoly) {
      const count = resources[opposingMonopoly]
      dispatch(
        updateResources({ ...newResources, [opposingMonopoly]: count * -1 })
      )
      socket.emit("resolve-monopoly", { room, card: opposingMonopoly, count })
    socket.emit('update-opponent-res', {oppRes: count*-1})
      dispatch(setOpposingMonopoly(null))
    }
  }, [opposingMonopoly])
  // const resolveMonopoly = useCallback(({card}) => {
  //   console.log(resources)
  //   const count = resources[card]
  //   dispatch(updateResources({...newResources,
  //     // wood: 0,
  //     // clay: 0,
  //     // wheat: 0,
  //     // rock: 0,
  //     // sheep: 0,
  //     [card]: count * -1
  //   }))
  //   console.log('hit monopoly receive')
  //   console.log({card})
  //   console.log({count})
  //   socket.emit('resolve-monopoly', {room, card, count})
  // }, [resources.wood, resources.clay, resources.wheat, resources.rock, resources.sheep])
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
    socket.on("buy-card", ({ deck }) => {
      dispatch(updateEnemyDevCards())
      dispatch(updateDevelopmentDeck(deck))
    })
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
    socket.on("monopoly", ({ card }) => {
      dispatch(setOpposingMonopoly(card))
    })
    socket.on("resolve-monopoly", ({ card, count }) => {
      // console.log('hit monopoly resolve')
      // console.log({card})
      // console.log({count})
      dispatch(
        updateResources({
          ...newResources,
          // wood: 0,
          // clay: 0,
          // wheat: 0,
          // rock: 0,
          // sheep: 0,
          [card]: count,
        })
      )
      dispatch(setMonopoly(false))
    })
    socket.on("play-knight", () => {
      console.log("knight")
      dispatch(updateEnemyDevCards(-1))
      dispatch(updateEnemyKnights())
    })
    socket.on("move-robber", ({ location, newMap }) => {
      dispatch(setRobberLocation(location))
      dispatch(setMapState(newMap))
    })
    socket.on("update-opponent-res", ({oppRes}) => {
      dispatch(updateEnemyResources(oppRes))
    })
  }, [])

  useEffect(() => {
    if (diceResult[0] + diceResult[1] === 7) {
      rollSeven()
    } else {
      const newBuildings = [...buildings]
      newBuildings.forEach((buildingId) => {
        buildingId.forEach((buildSlot) => {
          if (
            buildSlot.adjacent_numbers &&
            buildSlot.user_id === user.user_id
          ) {
            buildSlot.adjacent_numbers.forEach((g) => {
              if (
                g &&
                g.number === diceResult[0] + diceResult[1] &&
                g.id !== robberLocation
              ) {
                dispatch(
                  updateResources({
                    ...newResources,
                    [g.terrain]:
                      newResources[g.terrain] + buildSlot.building_type,
                  })
                )
                socket.emit('update-opponent-res', {room, oppRes: buildSlot.building_type})
              }
            })
          }
        })
      })
    }
  }, [diceResult])

  const rollSeven = () => {
    console.log("rollSeven")
    checkSevenCards()
    dispatch(setPlaceRobber(true))
  }

  const checkSevenCards = () => {
    const handTotal = Object.values(resources).reduce((a, v) => {
      return (a += v)
    }, 0)

    if (handTotal > 7) {
      dispatch(setPickDiscard(Math.floor(handTotal / 2)))
    }

    console.log("checkSeven Res", resources, handTotal)
  }

  const handlePort = (e, id) => {
    e.type === "3 for 1"
      ? dispatch(setPick31(true))
      : dispatch(setPickCard(true))
    dispatch(
      updateResources({
        ...newResources,
        [e.type]: newResources[e.type] - (e.type === "3 for 1" ? 3 : 2),
      })
    )
    socket.emit('update-opponent-res', {room, oppRes: 2})
  }

  const handlePickCard = (card) => {
    if (pickCard) {
      yearOfPlentyDev
        ? dispatch(setPickCard(true))
        : dispatch(setPickCard(false))
      dispatch(updateResources({ ...newResources, [card]: 1 }))
      socket.emit('update-opponent-res', {room, oppRes: 2})
    }else if(monopolyDev){
      // console.log('hit monopoly')
      socket.emit('monopoly', {card, room})
    }
  }

  const handleRobber = (id) => {
    let mapArray = [...map]
    let newArr = []
    let buildingsArray = [...buildings]
    let robSlots = [[0,1], [1], [0]]
    
    // stealCard(mapArray[id].x, mapArray[id].y, mapArray[id].z)
    setStealFrom(() => {
      mapArray[id].robAdj.forEach((e,i) => {
        newArr.push(robSlots[i].map((f,j) => buildingsArray[e][f].user_id).filter(f => f)[0])
      })
      newArr.push(robSlots[0].map((f,j) => buildingsArray[id][f].user_id).filter(f => f)[0])
      newArr = [...new Set(newArr.filter(f => (f == 1 || f == 2) && f !== user.user_id))]

      return newArr
    })

    mapArray[robberLocation].hasRobber = false
    mapArray[id].hasRobber = true
    dispatch(setRobberLocation(id))
    dispatch(setPlaceRobber(false))
    dispatch(setMapState(mapArray))
    socket.emit("move-robber", { room, id, map: mapArray })
  }
  
  const stealCard = (player) => {
    setStealFrom([])
    
    return
  }
  
  console.log("stealFrom", stealFrom)
  console.log("map", map)
  console.log("buildings", buildings)
  console.log("opponent", enemyPlayersInfo)
  // console.log("roads", roads)
  // console.log("robberLocation", robberLocation)

  return (
    <div className="game-container">
      {
        stealFrom[0] && <StealFrom stealFrom={stealFrom} setStealFrom={setStealFrom} stealCard={stealCard} />
      }
      {/* <StealFrom stealFrom={stealFrom} setStealFrom={setStealFrom} stealCard={stealCard} /> */}
      
      <div className="left-container">
          <div className="res-dice-container">
            <div className="res-container">
              <div className="res-4">
                {["wheat", "sheep", "wood"].map((e, i) => (
                  <div
                    key={i}
                    className={e}
                    onClick={
                      pickCard || monopolyDev ? () => handlePickCard(e) : null
                    }
                  ></div>
                ))}
                </div>
                <div className="res-3">
                {["clay", "rock", "development"].map((e,i) => (
                  <div
                    key={i}
                    className={e}
                    onClick={
                      pickCard || monopolyDev ? () => handlePickCard(e) : null
                    }
                  ></div>
                ))}
              </div>
            </div>
        </div>
        <div className="development-container">
          <DevelopmentDeck />
          <MyDevelopmentHand />
          </div>
        </div>
      <div className="middle-container">
        <div className="top-container">
            <OpponentHand />
        </div>
      <div className="map-middle-container">
        <Map handlePort={handlePort} handleRobber={handleRobber} />
        <div className="dice-container">
            <Dice />
            {turn > 2 && <DiceButton />}
          </div>
          <div className="end-turn-container">
          <EndTurnButton />
        </div>
      </div>
        <div className="bottom-container">
        <MyHand />
        
        
      </div>
      </div>
      <div className="right-container">
        <div className="opponent-dev-hand-container"></div>
        {/* {active && rolledDice && !tradePending && turn > 2 && <OfferTrade />} */}
        <div className="trade-container" >
        {active && rolledDice && !tradePending && (<OfferTrade />)}
        {incomingTrade && <IncomingTrade />}
        </div>
        
        {/* <IncomingTrade /> */}
        <Purchase />
          {/* {active && rolledDice && !tradePending && turn > 2 && } */}
        </div>
      
    </div>
  )
}

export default Game
