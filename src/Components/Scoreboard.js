import React from 'react'
import {GoPerson} from 'react-icons/go'

const Scoreboard = () => {
    return (
        <div className="scoreboard-container">
            <div className="scoreboard-title"><span>Score:</span></div>
            <div className="scoreboard-row">
                <div className="scoreboard-player" style={{background: "rgba(0, 0, 139, 0.700)"}}>
                    {/* <GoPerson color={"blue"} /> */}
                </div>
            </div>
            <div className="scoreboard-row">
                <div className="scoreboard-player" style={{background: "rgba(255, 0, 0, 0.700)"}}>
                {/* <GoPerson color={"darkred"} /> */}
                </div>
            </div>
        </div>
    )
}


export default Scoreboard;