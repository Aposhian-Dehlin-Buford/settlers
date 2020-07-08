import React, { useContext, useEffect } from "react"
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

const PurchaseItem = ({ cost, name, index }) => {
  const dispatch = useDispatch()
  const { user, socket } = useContext(UserContext)
  const { developmentDeck, developmentHand, room, buildSettlement, buildCity, buildRoad, resources, active, rolledDice, tradePending, turn } = useSelector((redux) => redux)
  const { wood, sheep, wheat, rock, clay } = cost

  const purchase = () => {
    dispatch(
      updateResources({
        wood: 0 - wood,
        clay: 0 - clay,
        sheep: 0 - sheep,
        wheat: 0 - wheat,
        rock: 0 - rock,
      })
    )
    socket.emit('update-opponent-res', {room, oppRes: Object.values({wood, clay, sheep, wheat, rock}).reduce((a, v) => {
      return (a += v)
    }, 0)})
    switch (name) {
      case "Settlement":
        // console.log("settlement build")
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
        // console.log(card)
        card[0] === 'Victory Point' && dispatch(updateVictoryPoints(1))
        socket.emit("buy-card", { deck, room })
        dispatch(updateDevelopmentDeck(deck))
        dispatch(updateDevelopmentHand(hand))
        break
      default:
        return
    }
  }

  const costs = [wood, clay, wheat, sheep, rock].map(
    (e, i) =>
      e > 0 &&
      [...Array(e)].map((f, j) =>
        i === 0 ? 
          "wood" : 
        i === 1 ? 
          "clay" : 
        i === 2 ? 
          "wheat" : 
        i === 3 ? 
          "sheep" : 
          "rock"
      )
  )
  .flat().filter(e => e != false).map((e,i) => {
    return <div key={i} className={`cost-picture-${e}`} style={{backgroundImage: 'url(' + require(`../images/${e}-alt.png`) + ')'}}></div>
  })

  // console.log("purchase-item-user", user)
  const ptStrings = ["0 pts.","1 pt.","2 pts.","? pts."]
  const canAfford = resources.wood >= wood &&
                    resources.clay >= clay &&
                    resources.sheep >= sheep &&
                    resources.wheat >= wheat &&
                    resources.rock >= rock && 
                    !buildSettlement &&
                    !buildCity &&
                    !buildRoad && 
                    active && 
                    rolledDice && 
                    !tradePending && 
                    turn > 2
                    
  return (
    <div 
      className="purchase-item-container" 
      onClick={canAfford ? purchase : null} 
      style={{
        background: canAfford &&"darkgreen",
        borderColor: user.user_id === 1 ? "darkblue" : "red"
    }}>
      <div className="cost-title"><span>{name === 'Development' ? "Development Card" : name}</span><span>{ptStrings[index]}</span></div>
      <div className="cost-row" >
      {
        costs
      }
      {/* {resources.wood >= wood &&
        resources.clay >= clay &&
        resources.sheep >= sheep &&
        resources.wheat >= wheat &&
        resources.rock >= rock && 
        !buildSettlement &&
        !buildCity &&
        !buildRoad && <button onClick={purchase}>Buy</button>} */}
      </div>
      {/* {wood > 0 && <span>Wood: {wood}</span>}
      {clay > 0 && <span>Clay: {clay}</span>}
      {wheat > 0 && <span>Wheat: {wheat}</span>}
      {sheep > 0 && <span>Sheep: {sheep}</span>}
      {rock > 0 && <span>Rock: {rock}</span>} */}
      
    </div>
  )
}

export default PurchaseItem
