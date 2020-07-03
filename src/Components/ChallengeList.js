import React, { useState, useEffect, useRef, useContext } from "react"
import { useDispatch } from "react-redux"
import { setGameState } from "../redux/gameReducer"
import { Button } from "@material-ui/core"
import { UserContext } from "../context/UserContext"
import "./UserList.scss"

const ChallengeList = () => {
  const dispatch = useDispatch()
  const activeComponent = useRef(true)
  const { user, socket } = useContext(UserContext)
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
    <div className="user-list-container">
      <div className="user-list-title">
        <h1>Challenges</h1>
      </div>
      <div className="user-list">
        {challenges.length > 0 &&
          challenges.map(({ challenger, opponent }) => (
            <div key={challenger.user_id} className="user-container">
              <span>USERNAME: {challenger.username}</span>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() =>
                  socket.emit("accept-challenge", {
                    challenger,
                    opponent,
                    gameStart: true,
                  })
                }
              >
                Accept
              </Button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ChallengeList
