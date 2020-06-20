import React, { useState, useEffect, useRef, useContext } from "react"
// import { useDispatch, useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setGameState } from "../redux/gameReducer"
import {UserContext} from '../context/UserContext'

const ChallengeList = () => {
  const dispatch = useDispatch()
  const activeComponent = useRef(true)
  const {user, socket} = useContext(UserContext)
  // const { socket, user } = useSelector(({ authReducer }) => authReducer)
  const [challenges, setChallenges] = useState([])
  useEffect(() => {
    return () => {
      activeComponent.current = false
    }
  }, [])
  useEffect(() => {
    socket.on("send-challenge", (body) => {
      if (activeComponent.current) {
        setChallenges((c) => {
          if (c.length === 0) return [body]
          else return c.push(body)
        })
      }
    })
    socket.on("remove-challenge", (body) => {
      if (activeComponent.current) {
        setChallenges((c) => {
          return c.filter((e) => {
            if (e.challenger.user_id === body.user_id) {
              return null
            } else {
              return e
            }
          })
        })
      }
    })
    socket.on("game-start", (body) => {
      activeComponent.current && dispatch(setGameState(body, user.user_id))
    })
  }, [socket, dispatch, user.user_id])
  return (
    <div>
      <div>Challenges</div>
      <div>
        {challenges.length > 0 &&
          challenges.map(({ challenger, opponent }) => (
            <div key={challenger.user_id}>
              <span>USERNAME: {challenger.username}</span>
              <button
                onClick={() =>
                  socket.emit("accept-challenge", {
                    challenger,
                    opponent,
                    gameStart: true,
                  })
                }
              >
                Accept
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ChallengeList
