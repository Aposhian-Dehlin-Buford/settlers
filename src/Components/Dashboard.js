import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSocket } from "../redux/authReducer"
import useAuth from "../hooks/useAuth"
import io from "socket.io-client"
import UserList from "./UserList"
import ChallengeList from "./ChallengeList"
import Game from './Game'
// import MyHand from "./MyHand"
const sock = io.connect("http://localhost:3333")

const Dashboard = () => {
  useAuth()
  const dispatch = useDispatch()
  const {socket, user} = useSelector(({authReducer}) => authReducer)
  const {gameStart} = useSelector(({gameReducer}) => gameReducer)
  // const [sock] = useState(() => io.connect("http://localhost:3333"))
  useEffect(() => {
    dispatch(setSocket(sock))
  }, [dispatch])
  return (
    <div>
      <div>Dashboard</div>
      {socket && <UserList />}
      {socket && <ChallengeList/>}
      {/* {socket && gameStart && <MyHand />} */}
      {socket && gameStart && <Game />}
    </div>
  )
}

export default Dashboard
