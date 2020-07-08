import React, {useEffect} from 'react'
import { useSelector } from "react-redux"


const OpponentHand = () => {
    const { enemyPlayersInfo } = useSelector((redux) => redux)

    const { resources } = enemyPlayersInfo[0]

    const oppHand = [...Array(resources)].map((e,i) => <div className="opponent-hand-card" key={i}></div>)

    console.log("enemyPlayersInfo", enemyPlayersInfo)
    console.log("enemy-hand", resources)
    console.log("opp-hand", oppHand)

    return (
        <div className="my-hand-container">
            {oppHand}
        </div>
    )
}

export default OpponentHand;