import React, {useContext} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setRolledDice } from '../redux/gameReducer'
import {GiRollingDices} from 'react-icons/gi'
import {UserContext} from '../context/UserContext'

const DiceButton = () => {
    const dispatch = useDispatch()
    const {socket} = useContext(UserContext)
    // const { socket } = useSelector(({ authReducer }) => authReducer)
    const { active, rolledDice, room } = useSelector((redux) => redux)
    return (
        <div>
             {active && !rolledDice && (
        <div className="roll-dice-button"
          onClick={() => {
            socket.emit("roll-dice", { room })
            dispatch(setRolledDice())
          }}
        >
          <GiRollingDices />
        </div>
      )}
        </div>
    )
}

export default DiceButton