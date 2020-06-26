import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import Settlements from "./Settlements"
import Roads from './Roads'
import {
  setBuildSettlement,
  setBuildCity,
  setBuildRoad,
  updateBuildings,
  setMapState,
  updateNumBuildings
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
    const slotNumbers = [[1,3], [0,2], [1,5], [0,4], [3,5], [2,4]]
      
      // const idsArr = mapArray[id-1].slots[slotNum].filter(e => e).map(e => e.id).sort((a,b) => a-b)
      
      // console.log("DING", idsArr)

    // const newSlots = [idsArr, slotNumbers[slotNum % 2 === 0 ? 0 : 1]]

      mapArray[id-1].slots[slotNum][5].forEach(e => {
        e[0] && e[1].forEach(f => id !== e[0] && buildingsArray[e[0]][f] && (buildingsArray[e[0]][f] = {...buildingsArray[e[0]][f], canBuild: false}))
      })
      slotNumbers[slotNum].forEach(e => buildingsArray[id][e] = {...buildingsArray[id][e], canBuild: false})

    

    // const disable = () => {
    //   idsArr.forEach((e,i) => {
    //     slotNumbers[slotNum % 2 === 0 ? 0 : 1][i].forEach((f,j) => {
    //       mapArray[e-1].slots[f].map(g => g.id).sort((a,b) => a-b).filter(g => g).forEach((g,j) => {
    //         let moreSlots = [...new Set(slotNumbers[slotNum % 2 === 0 ? 0 : 1].flat().sort((a,b) => b-a))]
    //         buildingsArray[g][moreSlots[j]] = {...buildingsArray[g][moreSlots[j]], canBuild: false}
    //       })
    //     buildingsArray[e][f] = {...buildingsArray[e][f], canBuild: false}
    //   })
    // })
    // }
    // disable()

    // console.log("mapArray", mapArray)
    const building = {
      hexagon_id: id,
      slot_id: slotNum,
      user_id: user.user_id,
      building_type: 1,
      adjacent_numbers: mapArray[id-1].slots[slotNum],
      adjacent_slots: ''
    }

    mapArray[id - 1].slots[slotNum][3] = 1
    mapArray[id - 1].slots[slotNum][4] = user.user_id
    dispatch(setMapState(mapArray))
    buildingsArray[id][slotNum] = building
    dispatch(setBuildSettlement(false))
    // dispatch(updateBuildings(buildingsArray))
    socket.emit("buy-building", { room, buildingsArray, map: mapArray })
  }

  // console.log("hexagon map", map)

  const handleRoadClick = (id, slotNum) => {
    console.log("handleRoadClick")
    let roadsArray = roads.slice()
    const mapArray = [...map]
    const road = {
      hexagon_id: id,
      slot_id: slotNum,
      user_id: user.user_id,
      adjacent_road_slots: mapArray[id-1].slots[slotNum],
    }
    roadsArray[id][slotNum] = road
    console.log("roadsArray", roadsArray)
    dispatch(setMapState(mapArray))
    dispatch(setBuildRoad(false))
    socket.emit("buy-road", { room, roadsArray, map: mapArray })
  }

  const handleCityClick = (id, slotNum) => {
    let buildingsArray = buildings.slice()
    const mapArray = [...map]

    mapArray[id - 1].slots[slotNum][3] = 2
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
            ? "blue"
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
            ? "radial-gradient(blue, black)"
            : "blue",
      }}
    >
      {e.number ? <div className="number-container" style={{color: e.number === 6 || e.number === 8 ? 'darkred' : 'black'}}>{id}</div> : null}
      <Settlements id={id} handleClick={handleClick} handleCityClick={handleCityClick} user={user} />
      <Roads id={id} handleRoadClick={handleRoadClick} />
      
    </div>
  )
}

export default Hexagon
