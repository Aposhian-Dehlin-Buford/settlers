import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSocket } from "../redux/authReducer"
import useAuth from "../hooks/useAuth"
import io from "socket.io-client"
import UserList from "./UserList"
import ChallengeList from "./ChallengeList"
const sock = io.connect("http://localhost:3333")

const Dashboard = () => {
  useAuth()
  const dispatch = useDispatch()
  const {socket, user} = useSelector(({authReducer}) => authReducer)
  // const [sock] = useState(() => io.connect("http://localhost:3333"))
  useEffect(() => {
    dispatch(setSocket(sock))
  }, [dispatch])
  return (
    <div>
      <div>Dashboard</div>
      {socket && user && <UserList />}
      {socket && user && <ChallengeList/>}
    </div>
  )
}

export default Dashboard
