import React, { useContext } from "react"
import { useSelector } from "react-redux"
import useAuth from "../hooks/useAuth"
import UserList from "./UserList"
import ChallengeList from "./ChallengeList"
import Game from './Game'
import {UserContext} from '../context/UserContext'

const Dashboard = () => {
  useAuth()
  const {socket} = useContext(UserContext)
  const {gameStart} = useSelector((redux) => redux)
  return (
    <div>
      {socket && !gameStart && <UserList />}
      {socket && !gameStart && <ChallengeList/>}
      {socket && gameStart && <Game />}
    </div>
  )
}

export default Dashboard
