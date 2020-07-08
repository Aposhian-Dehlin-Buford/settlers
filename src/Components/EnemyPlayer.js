import React from 'react'
import {useSelector} from 'react-redux'
import FaceUpKnights from './FaceUpKnights'

const EnemyPlayer = () => {
  const {enemyPlayersInfo} = useSelector(redux => redux)
  const {faceUpKnights, resources, developmentHandSize} = enemyPlayersInfo[0]
  
  return (
    <div>
      <FaceUpKnights {...{faceUpKnights}} />
      <div>Resources: {resources}</div>
      <div>Development Cards: {developmentHandSize}</div>
    </div>
  )
}

export default EnemyPlayer