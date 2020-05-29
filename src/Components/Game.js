import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import Map from "./Map/Map"
import "./Map/Map.scss"
import "./Game.scss"
import axios from "axios"
import { updateActivePlayer } from "../redux/gameReducer"

const Game = (props) => {
  // const [map, setMap] = useState([])
  const dispatch = useDispatch()
  const { socket } = useSelector(({ authReducer }) => authReducer)
  const { map, active, room } = useSelector(({ gameReducer }) => gameReducer)
  useEffect(() => {
    socket.on("pass-turn", () => dispatch(updateActivePlayer()))
  }, [socket])

  // useEffect(() => {
  //     console.log("1")
  //     axios.get('/api/map').then(res => setMap(res.data)).catch(err => console.log(err))
  // }, [])

  return (
    <div className="game-container">
      <div>{active}</div>
      {active && (
        <button
          onClick={() => {
            socket.emit("end-turn", { room })
          }}
        >
          End Turn
        </button>
      )}
      <Map map={map} />
    </div>
  )
}

export default Game
