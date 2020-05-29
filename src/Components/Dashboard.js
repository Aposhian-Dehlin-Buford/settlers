import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSocket } from "../redux/authReducer"
import useAuth from "../hooks/useAuth"
import io from "socket.io-client"
import UserList from "./UserList"
import ChallengeList from "./ChallengeList"
import Game from './Game'
const sock = io.connect("http://localhost:3333")

const Dashboard = () => {
  useAuth()
  const dispatch = useDispatch()
  const {socket} = useSelector(({authReducer}) => authReducer)
  const {gameStart} = useSelector(({gameReducer}) => gameReducer)
  useEffect(() => {
    dispatch(setSocket(sock))
  }, [dispatch])
  return (
    <div>
      {socket && !gameStart && <UserList />}
      {socket && !gameStart && <ChallengeList/>}
      {socket && gameStart && <Game />}
    </div>
  )
}

export default Dashboard
