import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setBuildRoad, setMonopoly, setPickCard } from "../redux/gameReducer"

const MyDevelopmentHand = () => {
  const { developmentHand } = useSelector((redux) => redux)
  const dispatch = useDispatch()
  const clickDevCard = (e) => {
    console.log(e)
    switch(e[0]){
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
  return (
    <div>
      {developmentHand.map((e, i) => (
        <div key={i} className={e} onClick={() => clickDevCard(e)}>
          {e}
        </div>
      ))}
    </div>
  )
}

export default MyDevelopmentHand
