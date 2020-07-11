import React, { useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setBuildRoad, setMonopoly, setPickCard, updateDevelopmentHand, setFaceUpKnights } from "../redux/gameReducer"
import { UserContext } from "../context/UserContext"

const MyDevelopmentHand = () => {
  const {user, socket} = useContext(UserContext)
  const { developmentHand, faceUpKnights, room } = useSelector((redux) => redux)
  const dispatch = useDispatch()
  const clickDevCard = (e) => {
    if(e !== 'Victory Point'){
      const devDeck = [...developmentHand]
      devDeck.splice(developmentHand.findIndex(el => e===el), 1)
      dispatch(updateDevelopmentHand(devDeck))
    }
    switch(e){
      case 'Knight':
        // set place robber to true
        dispatch(setFaceUpKnights())
        socket.emit('play-knight', {room})
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
      <div className="development-hand" style={{background: user.user_id === 1 ? "rgba(0, 0, 139, 0.100)" : "rgba(255, 0, 0, 0.100)", borderColor: user.user_id === 1 ? "darkblue" : "red"}}>
        {developmentHand.map((e, i) => (
          <div
            style={{backgroundImage: 'url(' + require(`../images/dev-${e.toLowerCase().split(' ').join('-')}.png`) + ')'}} 
            key={i} 
            className={e.toLowerCase().split(' ').join('-')} 
            onClick={() => clickDevCard(e)}>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyDevelopmentHand
