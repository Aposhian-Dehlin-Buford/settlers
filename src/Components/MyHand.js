import React from "react"
import { useSelector } from "react-redux"

const MyHand = () => {
  const { sheep, wood, clay, wheat, rock } = useSelector(
    ({ gameReducer }) => gameReducer.resources
  )

  const newHand = () => {
    let resArr = [sheep, wood, clay, wheat, rock]
    console.log(resArr)
    let resHand = resArr
      .map(
        (e, i) =>(
          e > 0 ?
          [...Array(e)].map((f, j) =>
            i === 0
              ? "sheep"
              : i === 1
              ? "wood"
              : i === 2
              ? "clay"
              : i === 3
              ? "wheat"
              : "rock"
          ): null)
      )
      .flat()
    return resHand.map((e, i) => {
      return <div key={i} className={e}>{e}</div>
    })
  }
  let myHand = newHand()

  return <div className="my-hand-container">{myHand}</div>
}

export default MyHand
