import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import Settlements from "./Settlements"
import Roads from './Roads'
import {
  setBuildSettlement,
  setBuildCity,
  setBuildRoad,
  updateBuildings,
  setMapState
} from "../../redux/gameReducer"
import { UserContext } from "../../context/UserContext"

const Hexagon = ({ e, id }) => {
  
  const dispatch = useDispatch()
  const { user, socket } = useContext(UserContext)
  const { buildSettlement, room, buildings, map, roads} = useSelector(
    (redux) => redux
  )

  const handleClick = (id, slotNum) => {
    const buildingsArray = buildings.slice()
    const mapArray = [...map]

      mapArray[id].slots[slotNum][5].forEach(e => {
       buildingsArray[e] && (buildingsArray[e][slotNum === 0 ? 1 : 0] = {...buildingsArray[e][slotNum === 0 ? 1 : 0], canBuild: false})
      })

    const building = {
      hexagon_id: id,
      slot_id: slotNum,
      user_id: user.user_id,
      building_type: 1,
      adjacent_numbers: mapArray[id].slots[slotNum]
    }

    mapArray[id].slots[slotNum][3] = 1
    mapArray[id].slots[slotNum][4] = user.user_id
    // dispatch(setMapState(mapArray))
    buildingsArray[id][slotNum] = {...buildingsArray[id][slotNum], ...building}
    buildingsArray[id][slotNum].canRoad[user.user_id] = true
    dispatch(setBuildSettlement(false))
    // dispatch(updateBuildings(buildingsArray))
    socket.emit("buy-building", { room, buildingsArray, map: mapArray })
  }

  const handleRoadClick = (id, slotNum) => {
    const mapArray = [...map]
    let roadsArray = roads.slice()
    let buildingsArray = buildings.slice()
    mapArray[id].roads[slotNum].forEach(e => buildingsArray[e[0]][e[1]].canRoad[user.user_id] = true)
    const road = {
      hexagon_id: id,
      slot_id: slotNum,
      user_id: user.user_id,
      // adjacent_road_slots: mapArray[id].slots[slotNum],
    }
    roadsArray[id][slotNum] = road
    dispatch(setMapState(mapArray))
    dispatch(setBuildRoad(false))
    socket.emit("buy-road", { room, roadsArray, map: mapArray })
  }

  const handleCityClick = (id, slotNum) => {
    let buildingsArray = buildings.slice()
    const mapArray = [...map]

    mapArray[id].slots[slotNum][3] = 2
    dispatch(setMapState(mapArray))
    buildingsArray[id][slotNum].building_type = 2
    dispatch(setBuildCity(false))
    // dispatch(updateBuildings(buildingsArray))
    socket.emit("buy-building", { room, buildingsArray, map: mapArray })
  }

  return (
    <div
      className="hexagon"
      style={{
        background:
          e.terrain === "water"
            ? "lightblue"
            : e.terrain === "wheat"
            ? "khaki"
            : e.terrain === "sheep"
            ? "green"
            : e.terrain === "wood"
            ? "darkgreen"
            : e.terrain === "rock"
            ? "grey"
            : e.terrain === "clay"
            ? "brown"
            : e.terrain === "desert"
            ? "tan"
            : e.terrain === "port"
            ? "black"
            : "blue",
      }}
    >
      {e.number ? <div className="number-container" style={{color: e.number === 6 || e.number === 8 ? 'darkred' : 'black'}}>{e.number}</div> : null}
      <Settlements id={id} handleClick={handleClick} handleCityClick={handleCityClick} user={user} />
      <Roads id={id} handleRoadClick={handleRoadClick} user={user.user_id} />
      
    </div>
  )
}

export default Hexagon
