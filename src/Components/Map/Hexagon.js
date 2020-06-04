import React from 'react';
import {BsHouseFill} from 'react-icons/bs'

const Hexagon = (props) => {
    const {e, i, map, id, buildSettlement, setBuildSettlement} = props

    const handleClick = (id, slotNum) => {
      setBuildSettlement(false)
    }

    return (
        <div
          className="hexagon"
          style={{
            background:
                e.terrain === "water"
                ? "blue"
                : e.terrain === "wheat"
                ? "khaki"
                : e.terrain === "sheep"
                ? "green"
                : e.terrain === "wood"
                ? "darkgreen"
                : e.terrain === "rock"
                ? "grey"
                : e.terrain === "clay"
                ? "brown"
                : e.terrain === "desert"
                ? "tan"
                : e.terrain === "port"
                ? "radial-gradient(blue, black)"
                : "blue",
          }}
        >
            {e.number ? <div className="number-container">{e.number}</div> : null}

              {buildSettlement ? <div className="settlement-container">
            {
                id === 1 || id === 3 || id === 8 || id === 10 || id === 12 || id === 17 || id === 19 ? 
                <><div className="settlement-container1" onClick={() => handleClick(id, 1)} ></div>
                <div className="settlement-container2" onClick={() => handleClick(id, 2)} ></div>
                <div className="settlement-container3" onClick={() => handleClick(id, 3)} ></div>
                <div className="settlement-container4" onClick={() => handleClick(id, 4)} ></div>
                <div className="settlement-container5" onClick={() => handleClick(id, 5)} ></div>
                <div className="settlement-container6" onClick={() => handleClick(id, 6)} ></div></> :
                id === 2 || id === 9 || id === 11 || id === 18 ?
                <><div className="settlement-container2" onClick={() => handleClick(id, 2)} ></div><div className="settlement-container5" onClick={() => handleClick(id, 5)} ></div></> : 
                id === 4 ? <div className="settlement-container1" onClick={() => handleClick(id, 1)} ></div> :
                id === 7 ? <div className="settlement-container3" onClick={() => handleClick(id, 3)} ></div> :
                id === 13 ? <div className="settlement-container4" onClick={() => handleClick(id, 4)} ></div> :
                id === 16 ? <div className="settlement-container6" onClick={() => handleClick(id, 6)} ></div> : null
              }
              </div>  : null}
        </div>
    )
}

export default Hexagon;