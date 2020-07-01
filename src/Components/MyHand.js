import React, {useState, useEffect} from "react"
import { useSelector } from "react-redux"

const MyHand = ({handlePick31}) => {
  const { resources, pick31 } = useSelector((redux) => redux)
  const { sheep, wood, clay, wheat, rock, } = resources

  const newHand = () => {
    return [sheep, wood, clay, wheat, rock]
      .map(
        (e, i) =>
          e > 0 &&
          [...Array(e)].map((f, j) =>
            i === 0 ? 
              "sheep" : 
            i === 1 ? 
              "wood" : 
            i === 2 ? 
              "clay" : 
            i === 3 ? 
              "wheat" : 
              "rock"
          )
      )
      .flat().filter(e => e != false)
      .map((e, i) => (
        <div 
          className={`hand-${e}`} 
          key={i}
          onClick={(pick31 && resources[e] >= 3) ? () => handlePick31(e) : null} 
        >
        </div>
      ))
  }
  return <div className="my-hand-container">{newHand()}</div>
}

export default MyHand
