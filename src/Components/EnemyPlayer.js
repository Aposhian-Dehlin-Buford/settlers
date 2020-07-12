import React from 'react'
import { useSelector } from 'react-redux'
import FaceUpKnights from './FaceUpKnights'

const EnemyPlayer = ({user}) => {
  const {enemyPlayersInfo} = useSelector(redux => redux)
  const {faceUpKnights, resources, developmentHandSize} = enemyPlayersInfo[0]
  
  return (
    <div className="opponent-dev-hand-container" style={{background: user === 1 ? "rgba(255, 0, 0, 0.100)" : "rgba(0, 0, 139, 0.100)", borderColor: user === 1 ? "red" : "darkblue"}}>
      <div className="opp-dev-cards" style={{borderColor: user === 1 ? "red" : "darkblue"}}><span>{developmentHandSize > 0 && developmentHandSize}</span></div>
      <FaceUpKnights {...{faceUpKnights, user}} />
    </div>
  )
}

export default EnemyPlayer