import React from "react"
import { useSelector } from "react-redux"

const Roads = ({ handleRoadClick, id, user }) => {
  const {
    turn,
    buildRoad,
    roads,
    map,
    buildings,
    firstRoadPlaced,
    secondRoadPlaced,
    firstTurn,
    secondTurn,
    firstSettlementPlaced,
    secondSettlementPlaced,
  } = useSelector((redux) => redux)

  const road = () => {
    const placements = [[2], [1, 2], [1], [0, 1], [0], [0, 1, 2]]

    // const zero = [id[0], [x-1, y, z-1]]
    // const one = [id[0], id[1]]
    // const two = [id[1], [x+1, y-1, z][0]]

    const canBuild = (id, slot) => {
      const canRoad = map[id].roads[slot].map(
        (e) => buildings[e[0]][e[1]].canRoad[user]
      )

      console.log('canBuild (Road)', canRoad)

      return canRoad[0] || canRoad[1] ? true : false
    }

    const roadBoolean = () =>
      buildRoad ||
      (turn===1 && firstSettlementPlaced && !firstRoadPlaced) ||
      (turn===2 && secondSettlementPlaced && !secondRoadPlaced)

    return [
      [0, 1, 2],
      [4, 9],
      [15],
      [22, 28],
      [33, 34, 35],
      [5, 6, 7, 10, 11, 12, 13, 16, 17, 18, 19, 20, 23, 24, 25, 26, 29, 30, 31],
    ].map(
      (e, i) =>
        e.includes(id) &&
        placements[i].map((f, i) => (
          <div
            key={i}
            onClick={
              roadBoolean() && !roads[id][f].hexagon_id && canBuild(id, f)
                ? () => handleRoadClick(id, f)
                : null
            }
            className={`road${f}`}
            style={
              (roads[id][f].hexagon_id || roads[id][f].hexagon_id === 0)
                ? { background: roads[id][f].user_id === 1 ? "blue" : "red" }
                : roadBoolean() && canBuild(id, f)
                ? { outline: "1px solid black" }
                : null
            }
          ></div>
        ))
    )

    // !roads[id][f].slot_id ?
    // (buildRoad && {outline: "1px solid black"}) :
    // {background: roads[id][f].user_id === 1 ? "blue" : "red"}}>{id, f}</div>))
  }

  return <div className="roads-container">{road()}</div>
}

export default Roads
