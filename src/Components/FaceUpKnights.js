import React from 'react'

const FaceUpKnights = ({faceUpKnights, player, user}) => (
  <div className="face-up-knights" style={{borderColor: (player === 1  && user === 1) || (player !== 1 && user !== 1) ? "darkblue" : "red"}}><span>{faceUpKnights > 0 && faceUpKnights}</span></div>
)

export default FaceUpKnights