import React from 'react';

const Hexagon = (props) => {
    const {e, i, map, id, buildSettlement, setBuildSettlement} = props
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
            {
              buildSettlement ?
                id === 1 || id === 3 || id === 8 || id === 10 || id === 12 || id === 17 || id === 19 ? 
                <><div className="settlement-container1"></div>
                <div className="settlement-container2"></div>
                <div className="settlement-container3"></div><div className="settlement-container4"></div>
                <div className="settlement-container5"></div>
                <div className="settlement-container6"></div></> :
                id === 2 || id === 9 || id === 11 || id === 18 ?
                <><div className="settlement-container2"></div><div className="settlement-container5"></div></> : 
                id === 4 ? <div className="settlement-container1"></div> :
                id === 7 ? <div className="settlement-container3"></div> :
                id === 13 ? <div className="settlement-container4"></div> :
                id === 16 ? <div className="settlement-container6"></div> : null
                : null
            }
        </div>
    )
}

export default Hexagon;