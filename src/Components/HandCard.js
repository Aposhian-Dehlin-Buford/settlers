import React, { useState, useRef, useEffect, createRef } from 'react';
import { TweenMax } from 'gsap'
import { useSelector, useDispatch } from "react-redux"
import { updateResources } from "../redux/gameReducer"
import { FaSmile } from 'react-icons/fa';

const HandCard = ({e, i, handlePick31, setDiscardCounter, discardCounter, toDiscard, setToDiscard, resetCards}) => {
    const dispatch = useDispatch()
    const { resources, pick31, pickDiscard } = useSelector((redux) => redux)

    const [isSelected, setIsSelected] = useState(false)

    let cardRef = useRef(null)

    const handlePickDiscard = () => {
        // console.log("discard counter", discardCounter)
        setIsSelected((isSelectedState) => {
            isSelectedState = !isSelected
            if (isSelectedState) {
                setToDiscard({...toDiscard, [e]: toDiscard[e]-1})
                setDiscardCounter(discardCounter-1)
            } else if (!isSelectedState) {
                setToDiscard({...toDiscard, [e]: toDiscard[e]+1})
                setDiscardCounter(discardCounter+1)
            }
            return isSelectedState
        })
        
    }

    useEffect(() => {
        if(pick31){
            if(resources[e] > 3){
                TweenMax.to(
                    cardRef,
                    .18,
                    { 
                      height: cardRef.getBoundingClientRect().height*1.5,
                      zIndex: 19
                    }
                  )
            }
        } else {
            TweenMax.to(
                cardRef,
                .18,
                { 
                  height: cardRef.getBoundingClientRect().height/1.5,
                  zIndex: 19
                }
              )
        }
    }, [pick31])

    useEffect(() => {
        if(isSelected){
            console.log("toDiscard", toDiscard)
            TweenMax.to(
              cardRef,
              .18,
              { 
                height: cardRef.getBoundingClientRect().height*1.5,
                zIndex: 19
              }
            )
        } else {
            // console.log("toDiscard", toDiscard)
            TweenMax.to(
                cardRef,
                .18,
                { 
                  height: cardRef.getBoundingClientRect().height/1.5,
                  zIndex: 19
                }
              )
        }

    }, [isSelected])

    useEffect(() => {
        // console.log("RESET CARDS", isSelected)
        setIsSelected(false)
    }, [resetCards])

    return (
        <div 
            className="hand-card-container" 
            key={i} 
            ref={el => {cardRef = el}}>
            <div 
                className={`hand-${e}`} 
                key={i}
                onClick={
                    (pick31 && resources[e] >= 3) ? () => handlePick31(e) : 
                    // () => handlePickDiscard(e,i)
                    (pickDiscard) ? () => handlePickDiscard() : null
                }
            >
            </div>
        </div>
    )
}

export default HandCard;