import React, {useEffect} from "react"
import { useSelector } from "react-redux"

const MyHand = () => {
  const { sheep, wood, clay, wheat, rock } = useSelector((redux) => redux.resources)

  // useEffect(() => {

  // }, [sheep, wood, clay, wheat, rock])

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
      .flat().filter(e => e != false)
      .map((e, i) => (
        <div className={`hand-${e}`} key={i} >
        </div>
      ))
  }
  return <div className="my-hand-container">{newHand()}</div>
}

export default MyHand
