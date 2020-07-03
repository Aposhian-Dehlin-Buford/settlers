import React, { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { Button } from "@material-ui/core"
import { UserContext } from "../context/UserContext"
import "./UserList.scss"

const UserList = () => {
  const activeComponent = useRef(true)
  const [users, setUsers] = useState([])
  const { user, socket } = useContext(UserContext)
  const { gameStart } = useSelector((redux) => redux)
  useEffect(() => {
    axios
      .get("/api/users")
      .then((results) => activeComponent.current && setUsers(results.data))
      .catch((err) => console.log(err))
    return () => {
      activeComponent.current = false
    }
  }, [])
  useEffect(() => {
    socket.emit("join", user)
    socket.on("users", (body) => activeComponent.current && setUsers(body))
  }, [socket, user])
  return (
    <div className="user-list-container">
      <div className="user-list-title">
        <h1>Active Users</h1>
      </div>
      <div className="user-list">
        {users.length > 0 &&
          users.map(({ username, user_id, email }, i) => (
            <div key={i} className="user-container">
              <span>USERNAME: {username}</span>
              {user.user_id !== user_id && !gameStart && (
                <Button
                  color="primary"
                  variant="outlined"
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
                </Button>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default UserList
