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
  setPickDiscard,
  setPlaceRobber,
  setMonopoly,
  setOpposingMonopoly,
  setEnemyFaceUpKnights,
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
  } = useSelector((redux) => redux)
  // console.log({ turn }) 
  // console.log({monopolyDev})
  useEffect(() => {
    if(opposingMonopoly){
      const count = resources[opposingMonopoly]
      dispatch(updateResources({...newResources, [opposingMonopoly]: count * -1}))
      socket.emit('resolve-monopoly', {room, card: opposingMonopoly, count})
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
    socket.on('monopoly', ({card}) => {
      dispatch(setOpposingMonopoly(card))
    })
    socket.on('resolve-monopoly', ({card, count}) => {
      // console.log('hit monopoly resolve')
      // console.log({card})
      // console.log({count})
      dispatch(updateResources({...newResources,
        // wood: 0,
        // clay: 0,
        // wheat: 0,
        // rock: 0,
        // sheep: 0,
        [card]: count
      }))
      dispatch(setMonopoly(false))
    })
    socket.on('play-knight', () => {
      console.log('knight')
      dispatch(setEnemyFaceUpKnights())
    })
  }, [])

  useEffect(() => {
    if(diceResult[0] + diceResult[1] === 7){
      rollSeven()
    } else {
      const newBuildings = [...buildings]
      newBuildings.forEach((e) => {
        e.forEach((f) => {
          if (f.adjacent_numbers && f.user_id === user.user_id) {
            f.adjacent_numbers.forEach((g) => {
              if (g && g.number === diceResult[0] + diceResult[1]) {
                dispatch(
                  updateResources({
                    ...newResources,
                    [g.terrain]: newResources[g.terrain] + f.building_type,
                  })
                )
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
    // dispatch(setPlaceRobber(true))
  }

  const checkSevenCards = () => {
    const handTotal = Object.values(resources).reduce((a,v) => {
      return a += v
    }, 0)

    if(handTotal > 7){
      dispatch(setPickDiscard(Math.floor(handTotal/2)))
    }
   
    console.log("checkSeven Res", resources, handTotal)
  }

  const handlePort = (e, id) => {
    // console.log("HANDLEPORT", e.type)
    e.type === "3 for 1"
      ? dispatch(setPick31(true))
      : dispatch(setPickCard(true))
    dispatch(
      updateResources({
        ...newResources,
        [e.type]: newResources[e.type] - (e.type === "3 for 1" ? 3 : 2),
      })
    )
  }

  const handlePickCard = (card) => {
    // console.log("HANDLE-PICK-CARD", card)
    // dispatch(setPickCard(false))
    // dispatch(updateResources({ ...newResources, [card]: 1 }))
    // console.log({pickCard})
    // console.log({monopolyDev})
    // console.log("HANDLE-PICK-CARD", card)
    if(pickCard){
      yearOfPlentyDev ? dispatch(setPickCard(true)):
      dispatch(setPickCard(false))
      dispatch(updateResources({ ...newResources, [card]: 1 }))
    }else if(monopolyDev){
      console.log('hit monopoly')
      socket.emit('monopoly', {card, room})
    }
  }

 
  // console.log("map", map)
  // console.log("buildings", buildings)
  // console.log("roads", roads)

  return (
    <div className="game-container">
      <div className="top-container">
        <EnemyPlayer />
        
        {/* {(buildSettlement || buildCity) && (
          <div className="top-container-overlay"></div>
        )} */}
        {active && rolledDice && !tradePending && turn > 2 && <OfferTrade />}
        {incomingTrade && <IncomingTrade />}
        
      </div>
      <div className="middle-container">
        {/* <div className="middle-left-container"></div> */}
        <div className="res-dice-container">
          <div className="res-container">
            <div className="res-4">
              {["wheat", "sheep", "wood"].map((e,i) => (
                <div
                  key={i}
                  className={e}
                  onClick={(pickCard || monopolyDev) ? () => handlePickCard(e) : null}
                ></div>
              ))}
              </div>
              <div className="res-3">
              {["clay", "rock"].map((e,i) => (
                <div
                  key={i}
                  className={e}
                  onClick={(pickCard || monopolyDev) ? () => handlePickCard(e) : null}
                ></div>
              ))}
              </div>
          </div>
          
          <div className="dice-container">
            {turn > 2 && <DiceButton />}
            <Dice />
          </div>
        </div>
        <Map handlePort={handlePort} />
        <EndTurnButton />
        <div className="middle-right-container">
          <div className="development-container">
            <DevelopmentDeck />
            <MyDevelopmentHand />
          </div>
            {active && rolledDice && !tradePending && turn > 2 && <Purchase />}
        </div>
      </div>
      <div className="bottom-container">
        <MyHand />
      </div>
    </div>
  )
}

export default Game
