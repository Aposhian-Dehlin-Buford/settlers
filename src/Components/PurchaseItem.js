import React, {useContext, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  updateResources,
  updateDevelopmentDeck,
  updateDevelopmentHand,
  setBuildSettlement,
  setBuildRoad,
  setBuildCity,
  updateVictoryPoints,
} from "../redux/gameReducer"
import {UserContext} from '../context/UserContext'

const PurchaseItem = ({ cost, name }) => {
  const dispatch = useDispatch()
  const {socket} = useContext(UserContext)
  const { developmentDeck, developmentHand, room, buildSettlement, buildCity, buildRoad } = useSelector((redux) => redux)
  const { wood, sheep, wheat, rock, clay } = useSelector((redux) => redux.resources)

  const purchase = () => {
    dispatch(
      updateResources({
        wood: 0 - cost.wood,
        clay: 0 - cost.clay,
        sheep: 0 - cost.sheep,
        wheat: 0 - cost.wheat,
        rock: 0 - cost.rock,
      })
    )
    switch (name) {
      case "Settlement":
        dispatch(setBuildSettlement(true))
        break
      case "Road":
        dispatch(setBuildRoad(true))
        break
      case "City":
        dispatch(setBuildCity(true))
        break
      case "Development":
        const deck = [...developmentDeck]
        const hand = [...developmentHand]
        const [card] = deck.splice(0, 1)
        hand.push(card)
        console.log(card)
        card[0] === 'Victory Point' && dispatch(updateVictoryPoints(1))
        socket.emit("buy-card", { deck, room })
        dispatch(updateDevelopmentDeck(deck))
        dispatch(updateDevelopmentHand(hand))
        break
      default:
        return
    }
  }
  return (
    <div className="purchase-item-container">
      <div>Purchase {name}</div>
      <div>Cost:</div>
      {cost.wood > 0 && <span>Wood: {cost.wood}</span>}
      {cost.clay > 0 && <span>Clay: {cost.clay}</span>}
      {cost.wheat > 0 && <span>Wheat: {cost.wheat}</span>}
      {cost.sheep > 0 && <span>Sheep: {cost.sheep}</span>}
      {cost.rock > 0 && <span>Rock: {cost.rock}</span>}
      {wood >= cost.wood &&
        clay >= cost.clay &&
        sheep >= cost.sheep &&
        wheat >= cost.wheat &&
        rock >= cost.rock && 
        !buildSettlement &&
        !buildCity &&
        !buildRoad && <button onClick={purchase}>Buy</button>}
    </div>
  )
}

export default PurchaseItem
