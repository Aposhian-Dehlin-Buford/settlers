import React from "react"
import { useSelector } from "react-redux"

const MyHand = () => {
  const { sheep, wood, clay, wheat, rock } = useSelector(
    ({ gameReducer }) => gameReducer.resources
  )

  const newHand = () => {
    let resArr = [sheep, wood, clay, wheat, rock]
    let resHand = resArr.map((e,i) => [...Array(e)].map((f,j) => (i === 0 ? 'wheat' : i === 1 ? 'sheep' : i === 2 ? 'wood' : i === 3 ? 'rock' : 'clay'))).flat()
    return resHand.map((e,i) => {
      return <div className={e}>{e}</div>
    })
  }
  let myHand = newHand()
  
  return (
    <div className="my-hand-container">
      {myHand}
    </div>
  )
}

export default MyHand
