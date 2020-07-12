import React from 'react'
import { useSelector } from 'react-redux'

const Dice = ({canRoll, handleDice}) => {
    const {diceResult} = useSelector((redux) => redux)
    let result = diceResult[0] + diceResult[1]
    return (
        <div className="dice-numbers" style={{color: result === 7 && "darkred"}} onClick={canRoll ? handleDice : null}>{result > 0 && result}</div>
    )
}

export default Dice