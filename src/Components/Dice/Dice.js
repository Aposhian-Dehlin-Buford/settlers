import React from 'react'
import { useSelector } from 'react-redux'

const Dice = () => {
    const {diceResult} = useSelector((redux) => redux)
    let result = diceResult[0] + diceResult[1]
    return (
        <div className="dice-numbers">{result > 0 && result}</div>
    )
}

export default Dice