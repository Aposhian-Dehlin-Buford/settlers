import React, { useState, useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

const UserList = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const { socket, user } = useSelector(({ authReducer }) => authReducer)
  const {gameStart} = useSelector(({gameReducer}) => gameReducer)
  useEffect(() => {
    axios
      .get("/api/users")
      .then((results) => {
        setUsers(results.data)
      })
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    socket.emit("join", user)
    socket.on("users", (body) => setUsers(body))
    // socket.on('send-challenge', (body) => console.log(body))
    // socket.on('remove-challenge', (body) => console.log(body))
    // socket.on('game-start', (body) => console.log(body))
  }, [socket])
  return (
    <div>
      <div>Active Users</div>
      <div>
        {users.length > 0 &&
          users.map(({ username, user_id, email }) => (
            <div key={user_id}>
              <span>USERNAME: {username}</span>
              {user.user_id !== user_id && !gameStart && (
                <button
                  onClick={() => {
                    if (user.user_id !== user_id) {
                      socket.emit("challenge", {
                        challenger: user,
                        opponent: { username, user_id, email },
                        gameStart: false,
                      })
                    }
                  }}
                >
                  Challenge
                </button>
              )}
            </div>
          ))}{" "}
      </div>
      {/* <pre>{JSON.stringify(users, null, 2)} </pre> */}
    </div>
  )
}

export default UserList
