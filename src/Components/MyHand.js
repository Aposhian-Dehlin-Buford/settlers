import React from "react"
import { useSelector } from "react-redux"

const MyHand = () => {
  const { sheep, wood, clay, wheat, rock } = useSelector(
    ({ gameReducer }) => gameReducer.resources
  )
  return (
    <div>
      <div>My Hand</div>
      <div>Sheep: {sheep}</div>
      <div>Wood: {wood}</div>
      <div>Clay: {clay}</div>
      <div>Wheat: {wheat}</div>
      <div>Rock: {rock}</div>
    </div>
  )
}

export default MyHand
