import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import Settlements from "./Settlements"
import { FaAnchor } from 'react-icons/fa'
import { BsFillPersonFill } from 'react-icons/bs'
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
  updateVictoryPoints,
  setPlaceRobber,
  setRobberLocation
} from "../../redux/gameReducer"
import { UserContext } from "../../context/UserContext"

const Hexagon = ({ e, id, handlePort, handleRobber }) => {
  const dispatch = useDispatch()
  const { user, socket } = useContext(UserContext)
  const {
    turn,
    buildSettlement,
    buildRoad,
    firstTurn,
    secondTurn,
    roadBuildDev,
    active,
    room,
    buildings,
    map,
    roads,
    firstSettlementPlaced,
    secondSettlementPlaced,
    firstRoadPlaced,
    secondRoadPlaced,
    placeRobber,
    robberLocation,
  } = useSelector((redux) => redux)
  const handleClick = (id, slotNum) => {
    if (
      active &&
      (buildSettlement ||
        (turn === 1 && !firstSettlementPlaced) ||
        (turn === 2 && !secondSettlementPlaced))
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
      dispatch(setMapState(mapArray))
      buildingsArray[id][slotNum] = {
        ...buildingsArray[id][slotNum],
        ...building,
      }
      buildingsArray[id][slotNum].canRoad[user.user_id] = true
      buildingsArray[id][slotNum].port &&
        (buildingsArray[id][slotNum].port[1] = user.user_id)
      dispatch(setBuildSettlement(false))
      turn === 1 && !firstSettlementPlaced && dispatch(placeFirstSettlement())
      if (turn === 2 && !secondSettlementPlaced) {
        dispatch(placeSecondSettlement())
        const resources = {
          wheat: 0,
          clay: 0,
          sheep: 0,
          rock: 0,
          wood: 0,
        }
        for (let i = 0; i < 3; i++) {
          resources[buildingsArray[id][slotNum].adjacent_numbers[i].terrain]++
        }
        dispatch(updateResources(resources))
        socket.emit('update-opponent-res', {room, oppRes: Object.values(resources).reduce((a, v) => {
          return (a += v)
        }, 0)})

      }
      dispatch(updateVictoryPoints(1))
      socket.emit("buy-building", { room, buildingsArray, map: mapArray })
    }
  }

  const handleRoadClick = (id, slotNum) => {
    console.log("handleRoadClick", id, slotNum)
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
    }
    roadsArray[id][slotNum] = road
    dispatch(setMapState(mapArray))
    roadBuildDev ? dispatch(setBuildRoad(true)) : dispatch(setBuildRoad(false))
    turn === 1 && !firstRoadPlaced && dispatch(placeFirstRoad())
    turn === 2 && !secondRoadPlaced && dispatch(placeSecondRoad())
    socket.emit("buy-road", { room, roadsArray, map: mapArray })
    socket.emit("buy-building", { room, buildingsArray, map: mapArray })
  }

  const handleCityClick = (id, slotNum) => {
    let buildingsArray = buildings.slice()
    const mapArray = [...map]

    mapArray[id].slots[slotNum][3] = 2
    dispatch(setMapState(mapArray))
    buildingsArray[id][slotNum].building_type = 2
    dispatch(updateVictoryPoints(1))
    dispatch(setBuildCity(false))
    socket.emit("buy-building", { room, buildingsArray, map: mapArray })
  }

  // const handleRobber = () => {
    
  // }


  const portSlot1 =
    e.terrain === "port" &&
    buildings[e.portSlots[0][0]][e.portSlots[0][1]].port[1]
  const portSlot2 =
    e.terrain === "port" &&
    buildings[e.portSlots[1][0]][e.portSlots[1][1]].port[1]

  return (
    <div
      className="hexagon"
      style={["water", "port"].includes(e.terrain) ?
      {background: "lightblue"} :
      {backgroundImage: 'url(' + require(`../../images/settlers-${e.terrain}-tile.png`) + ')'}}
      >
      {
        e.terrain === "port" && 
        <div           className="port"
        onClick={
          (portSlot1 === user.user_id || portSlot2 === user.user_id) ? 
          () => handlePort(e, id) : null
        }
        style={{
          borderColor: 
            portSlot1 === 1 ||
            portSlot2 === 1 ?
            "darkblue" : 
            portSlot1 === 2 ||
            portSlot2 === 2 ? "red" : 
            "white",
          backgroundImage: e.type !== "3 for 1" &&
            'url(' + require(`../../images/${e.type}-alt.png`) + ')'
        }}>{e.type === "3 for 1" && 
          <span onClick={
            (portSlot1 === user.user_id || portSlot2 === user.user_id) ? 
            () => handlePort(e, id) : null
          }>3:1</span>}</div>}{
          e.terrain === "port" && (<>
            <div className={`port${e.portID}0`}><FaAnchor /></div>
            {/* <div className={`port${e.portID}1`}><FaAnchor /></div> */}
          </>)
        }
        {
          e.hasRobber ? <div className="robber"><BsFillPersonFill /></div> : null
        }
      {e.number ? (
        <div
          className="number-container"
          onClick={placeRobber ? () => handleRobber(id) : null}
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
