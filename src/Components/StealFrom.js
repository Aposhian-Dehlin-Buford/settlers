import React from 'react'
import {GoPerson} from 'react-icons/go'

const StealFrom = ({ stealFrom, setStealFrom, stealCard}) => {
    const playerArray = stealFrom.map((e,i) => <div 
    className="steal-from-player"
    onClick={() => stealCard(e)} 
    style={{background: e === 1 ? "darkblue" : "red"}} 
    key={i}><GoPerson color={e === 1 ? "lightblue" : "darkred"} /></div>)

    return (
        <div className="steal-from-overlay">
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