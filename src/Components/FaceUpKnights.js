import React from 'react'

const FaceUpKnights = ({faceUpKnights}) => (
  <div className="face-up-knights"><span>{faceUpKnights > 0 && faceUpKnights}</span></div>
)

export default FaceUpKnights