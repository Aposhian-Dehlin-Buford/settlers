import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import Settlements from "./Settlements"
import Roads from './Roads'
import {
  setBuildSettlement,
  updateBuildings,
  setMapState,
  updateNumBuildings
} from "../../redux/gameReducer"
import { UserContext } from "../../context/UserContext"

// const buildingArrayExample = [
//   {
//     hexagon_id: 3,
//     slot_id: 3,
//     owner: 1,
//     building_type: 1,
//     adjacent_numbers: [6, 12, 3],
//   },
// ]

const Hexagon = ({ e, id }) => {
  
  const dispatch = useDispatch()
  const { user, socket } = useContext(UserContext)
  const { buildSettlement, room, buildings, map, numBuildings } = useSelector(
    (redux) => redux
  )

  const handleClick = (id, slotNum) => {
    let numBuildingsArray = numBuildings.slice()
    let buildingsArray = buildings.slice()
    const mapArray = [...map]
    const building = {
      hexagon_id: id,
      slot_id: slotNum,
      user_id: user.user_id,
      building_type: 1,
      adjacent_numbers: mapArray[id-1].slots[slotNum],
    }

    mapArray[id - 1].slots[slotNum][3] = 1
    mapArray[id - 1].slots[slotNum][4] = user.user_id
    dispatch(setMapState(mapArray))
    numBuildings.push(building)
    buildingsArray[id][slotNum] = building
    dispatch(setBuildSettlement(false))
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
      {e.number ? <div className="number-container" style={{color: e.number === 6 || e.number === 8 ? 'darkred' : 'black'}}>{e.number}</div> : null}
      <Settlements id={id} handleClick={handleClick} />
      <Roads />
      
    </div>
  )
}

export default Hexagon
