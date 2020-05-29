import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setGameState } from "../redux/gameReducer"

const ChallengeList = () => {
  const dispatch = useDispatch()
  const [challenges, setChallenges] = useState([])
  const { socket, user } = useSelector(({ authReducer }) => authReducer)
  useEffect(() => {
    socket.on("send-challenge", (body) => {
      setChallenges((c) => {
        if (c.length === 0) return [body]
        else return c.push(body)
      })
    })
    socket.on("remove-challenge", (body) => {
      setChallenges((c) => {
        return c.filter((e) => {
          if (e.challenger.user_id === body.user_id) {
            return null
          } else {
            return e
          }
        })
      })
    })
    socket.on("game-start", (body) => {
        dispatch(setGameState(body, user.user_id))
    })
  }, [socket])
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
