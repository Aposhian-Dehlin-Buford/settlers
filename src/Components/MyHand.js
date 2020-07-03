import React, {useState, useEffect, useRef, createRef} from "react"
import {TweenMax} from 'gsap'
import { useSelector, useDispatch } from "react-redux"
import { updateResources, setPickDiscard } from "../redux/gameReducer"
import HandCard from './HandCard'

let newResources = {
  sheep: 0,
  wood: 0,
  clay: 0,
  wheat: 0,
  rock: 0,
}

const MyHand = ({handlePick31}) => {
  const dispatch = useDispatch()
  const { resources, pick31, pickDiscard } = useSelector((redux) => redux)
  const { sheep, wood, clay, wheat, rock, } = resources

  const [refs, setRefs] = useState([])
  const [discardCounter, setDiscardCounter] = useState(0)
  const [toDiscard, setToDiscard] = useState(newResources)
  const [resetCards, setResetCards] = useState(false)
  const [hand, setHand] = useState(
    [sheep, wood, clay, wheat, rock]
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
  )

  useEffect(() => {
    setHand([sheep, wood, clay, wheat, rock]
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
      .flat().filter(e => e != false))
  }, [resources])

  useEffect(() => {
    setDiscardCounter(pickDiscard)
  }, [pickDiscard])

  const handleDiscard = (cards) => {
    dispatch(updateResources({...toDiscard}))
    newResources = {
      sheep: 0,
      wood: 0,
      clay: 0,
      wheat: 0,
      rock: 0,
    }
    setToDiscard(newResources)
    dispatch(setPickDiscard(false))
    setResetCards(!resetCards)

  }

  // console.log("refs", refs)
  // console.log("cardsRef", cardsRef)
  // console.log("pickDiscard-MyHand", pickDiscard)
  // console.log("discardCounter", discardCounter)
  // console.log("newResources", newResources)
  // console.log("hand", hand)

return (
  <div className="my-hand-container">
    {
      hand.map((e, i) => (
        <HandCard 
          key={i}
          e={e} 
          i={i} 
          handlePick31={handlePick31} 
          setDiscardCounter={setDiscardCounter}
          discardCounter={discardCounter}
          setToDiscard={setToDiscard}
          toDiscard={toDiscard}
          resetCards={resetCards}
          // handlePickDiscard={handlePickDiscard} 
        />
      ))
    }
    <div className="discard-button-container">
      {(discardCounter === 0 || discardCounter < 0) && 
      <button 
        className="discard-button" 
        onClick={handleDiscard}>Discard
      </button>}
    </div>
  </div>
)
}

export default MyHand
