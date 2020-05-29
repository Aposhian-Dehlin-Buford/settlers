import React from 'react'
import { useSelector } from 'react-redux'

const Dice = () => {
    const {diceResult} = useSelector(({gameReducer}) => gameReducer)
    return (
        <div>{diceResult[0]} {diceResult[1]}</div>
    )
}

export default Dice