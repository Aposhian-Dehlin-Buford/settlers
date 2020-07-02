import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import Settlements from "./Settlements"
import Roads from "./Roads"
import {
  setBuildSettlement,
  setBuildCity,
  setBuildRoad,
  updateBuildings,
  setMapState,
  placeFirstSettlement,
  placeSecondSettlement,
  placeFirstRoad,
  placeSecondRoad,
  updateResources,
} from "../../redux/gameReducer"
import { UserContext } from "../../context/UserContext"

const Hexagon = ({ e, id }) => {
  const dispatch = useDispatch()
  const { user, socket } = useContext(UserContext)
  const {
    buildSettlement,
    buildRoad,
    firstTurn,
    secondTurn,
    active,
    room,
    buildings,
    map,
    roads,
    firstSettlementPlaced,
    secondSettlementPlaced,
    firstRoadPlaced,
    secondRoadPlaced,
  } = useSelector((redux) => redux)
  // console.log({active}, {buildSettlement})
  // console.log({firstTurn}, {secondTurn})
  // console.log({firstSettlementPlaced}, {secondSettlementPlaced})
  const handleClick = (id, slotNum) => {
    if (
      active &&
      (buildSettlement ||
        (firstTurn && !firstSettlementPlaced) ||
        (!firstTurn && secondTurn && !secondSettlementPlaced))
    ) {
      const buildingsArray = buildings.slice()
      const mapArray = [...map]

      mapArray[id].slots[slotNum][5].forEach((e) => {
        buildingsArray[e] &&
          (buildingsArray[e][slotNum === 0 ? 1 : 0] = {
            ...buildingsArray[e][slotNum === 0 ? 1 : 0],
            canBuild: false,
          })
      })

      const building = {
        hexagon_id: id,
        slot_id: slotNum,
        user_id: user.user_id,
        building_type: 1,
        adjacent_numbers: mapArray[id].slots[slotNum],
      }

      mapArray[id].slots[slotNum][3] = 1
      mapArray[id].slots[slotNum][4] = user.user_id
      // dispatch(setMapState(mapArray))
      buildingsArray[id][slotNum] = {
        ...buildingsArray[id][slotNum],
        ...building,
      }
      buildingsArray[id][slotNum].canRoad[user.user_id] = true
      buildingsArray[id][slotNum].port && (buildingsArray[id][slotNum].port[1] = user.user_id)
      dispatch(setBuildSettlement(false))
      firstTurn && !firstSettlementPlaced && dispatch(placeFirstSettlement())
      if(!firstTurn && !secondSettlementPlaced){
        dispatch(placeSecondSettlement())
        //get resources based on second settlement location
        console.log("THIS IS A TEST")
        console.log(buildingsArray[id][slotNum])
        const resources = {
          wheat: 0,
          clay: 0,
          sheep: 0,
          rock: 0,
          wood: 0
        }
        for(let i = 0; i < 3; i++){
          resources[buildingsArray[id][slotNum].adjacent_numbers[i].terrain] ++
          // console.log(buildingsArray[id][slotNum].adjacent_numbers[i].terrain)
        }
        console.log(resources)
        dispatch(updateResources(resources))
        
        // buildingsArray[id][slotNum].adjacent_numbers.forEach(e => {
        //   console.log(e)
        // })
      }
      // !firstTurn && !secondSettlementPlaced && dispatch(placeSecondSettlement())
      // dispatch(updateBuildings(buildingsArray))
      socket.emit("buy-building", { room, buildingsArray, map: mapArray })
    }
  }

  const handleRoadClick = (id, slotNum) => {
    // if (
    //   active &&
    //   (buildRoad ||
    //     (firstTurn && firstSettlementPlaced && !firstRoadPlaced) ||
    //     (secondTurn && secondSettlementPlaced && !secondRoadPlaced))
    // ) {
    const mapArray = [...map]
    let roadsArray = roads.slice()
    let buildingsArray = buildings.slice()
    mapArray[id].roads[slotNum].forEach(
      (e) => (buildingsArray[e[0]][e[1]].canRoad[user.user_id] = true)
    )
    const road = {
      hexagon_id: id,
      slot_id: slotNum,
      user_id: user.user_id,
      // adjacent_road_slots: mapArray[id].slots[slotNum],
    }
    roadsArray[id][slotNum] = road
    dispatch(setMapState(mapArray))
    dispatch(setBuildRoad(false))
    firstTurn && !firstRoadPlaced && dispatch(placeFirstRoad())
    !firstTurn && !secondRoadPlaced && dispatch(placeSecondRoad())
    socket.emit("buy-road", { room, roadsArray, map: mapArray })
    // }
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
      {e.number ? (
        <div
          className="number-container"
          style={{
            color: e.number === 6 || e.number === 8 ? "darkred" : "black",
          }}
        >
          {e.number}
        </div>
      ) : null}
      <Settlements
        id={id}
        handleClick={handleClick}
        handleCityClick={handleCityClick}
        user={user}
      />
      <Roads id={id} handleRoadClick={handleRoadClick} user={user.user_id} />
    </div>
  )
}

export default Hexagon
