import React from "react"
import { useSelector } from "react-redux"

const MyHand = () => {
  const { sheep, wood, clay, wheat, rock } = useSelector(
    ({ gameReducer }) => gameReducer.resources
  )

  const newHand = () => {
    return [sheep, wood, clay, wheat, rock]
      .map(
        (e, i) =>
          e > 0 &&
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
          )
      )
      .flat()
      .map((e, i) => (
        <div key={i} className={e}>
          {e}
        </div>
      ))
  }
  return <div className="my-hand-container">{newHand()}</div>
}

export default MyHand
