import React, { useEffect, useRef } from 'react'
import {GoPerson} from 'react-icons/go'
import {TweenMax} from 'gsap'

const StealFrom = ({ stealFrom, setStealFrom, stealCard}) => {
    let overlay = useRef(null)

    useEffect(() => {
        TweenMax.from(
            overlay,
            .5,
            {
                opacity: 0
            }
        )
    }, [])



    const playerArray = stealFrom.map((e,i) => <div 
    className="steal-from-player"
    onClick={() => stealCard(e)} 
    style={{background: e === 1 ? "darkblue" : "red"}} 
    key={i}><GoPerson color={e === 1 ? "lightblue" : "darkred"} /></div>)

    return (
        <div className="steal-from-overlay" ref={el => {overlay = el}}>
        <div className="steal-from-container">
          <div className="steal-from-title">Steal a Card From:</div>
          <div className="steal-from">
              <div className="steal-from-skip" onClick={() => stealCard(null)} >SKIP</div>
              {
                playerArray
              }
          </div>
        </div>
      </div>
    )
}

export default StealFrom;