import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setBuildRoad, setMonopoly, setPickCard, updateDevelopmentHand } from "../redux/gameReducer"

const MyDevelopmentHand = () => {
  const { developmentHand } = useSelector((redux) => redux)
  const dispatch = useDispatch()
  const clickDevCard = (e) => {
    if(e !== 'Victory Point' || 'Knight'){
      const devDeck = [...developmentHand]
      devDeck.splice(developmentHand.findIndex(el => e===el), 1)
      dispatch(updateDevelopmentHand(devDeck))
    }
    switch(e){
      case 'Knight':
        // set place robber to true
        break
      case 'Victory Point':
        // +1 victory point, happens on buy
        break
      case 'Road Building':
        // +2 roads
        dispatch(setBuildRoad(true, true))
        break
      case 'Monopoly':
        // steal all cards of one type from all other players
        dispatch(setMonopoly())
        break
      case 'Year of Plenty':
        // select 2 resources from the bank
        dispatch(setPickCard(true, true))
        break
      default:
        break
    }
  }

  console.log("developmentHand", developmentHand)
  return (
    <div className="development-hand-container">
      {developmentHand.map((e, i) => (
        <div 
          key={i} 
          className={e.toLowerCase().split(' ').join('-')} 
          onClick={() => clickDevCard(e)}>
          {e}
        </div>
      ))}
    </div>
  )
}

export default MyDevelopmentHand
