import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateResources, updateDevelopmentDeck, updateDevelopmentHand } from "../redux/gameReducer"

const PurchaseItem = ({ cost, name, buildSettlement, setBuildSettlement }) => {
    console.log("name", name, buildSettlement)
    const dispatch = useDispatch()
    const {socket} = useSelector(({authReducer}) => authReducer)
    const {developmentDeck, developmentHand, room} = useSelector(({gameReducer}) => gameReducer)
  const { wood, sheep, wheat, rock, clay } = useSelector(
    ({ gameReducer }) => gameReducer.resources
  )

  const purchase = () => {
    if(name === 'Settlement'){
      setBuildSettlement(true)
    }

    console.log(`purchased ${name}`)
    //add functionality to purchase the item
    dispatch(updateResources({
        wood: 0-cost.wood,
        clay: 0-cost.clay,
        sheep: 0-cost.sheep,
        wheat: 0-cost.wheat,
        rock: 0-cost.rock
    }))
    switch(name){
      case 'Development':
        const deck = [...developmentDeck]
        const hand = [...developmentHand]
        const card = deck.splice(0, 1)
        hand.push(card)
        socket.emit('buy-card', {deck, room})
        dispatch(updateDevelopmentDeck(deck))
        dispatch(updateDevelopmentHand(hand))
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
      {(wood >= cost.wood &&
        clay >= cost.clay &&
        sheep >= cost.sheep &&
        wheat >= cost.wheat &&
        rock >= cost.rock) && (
        <button onClick={purchase}>Buy</button>
        )}
    </div>
  )
}

export default PurchaseItem
