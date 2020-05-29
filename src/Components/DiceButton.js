import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setRolledDice } from '../redux/gameReducer'

const DiceButton = () => {
    const dispatch = useDispatch()
    const { socket } = useSelector(({ authReducer }) => authReducer)
    const { active, rolledDice, room } = useSelector(({ gameReducer }) => gameReducer)
    return (
        <div>
             {active && !rolledDice && (
        <button
          onClick={() => {
            socket.emit("roll-dice", { room })
            dispatch(setRolledDice())
          }}
        >
          Roll Dice
        </button>
      )}
        </div>
    )
}

export default DiceButton