import React from "react"
import { useSelector } from "react-redux"
import { BsHouseDoorFill } from "react-icons/bs"
import { FaBuilding } from "react-icons/fa"
import {AiFillHome} from 'react-icons/ai'

const Settlements = (props) => {
  const { id, handleClick, handleCityClick, user } = props

  const {
    turn,
    active,
    buildSettlement,
    buildCity,
    buildings,
    firstTurn,
    secondTurn,
    firstSettlementPlaced,
    secondSettlementPlaced,
  } = useSelector((redux) => redux)

  const settle = () => {
    const placements = [[1], [0], [0, 1]]
    return [
      [0, 1, 2],
      [33, 34, 35],
      [
        4,
        5,
        6,
        7,
        9,
        10,
        11,
        12,
        13,
        15,
        16,
        17,
        18,
        19,
        20,
        22,
        23,
        24,
        25,
        26,
        28,
        29,
        30,
        31,
      ],
    ].map(
      (e, i) =>
        e.includes(id) &&
        placements[i].map((f, j) => (
          <div key={j} className={`settlement-container${f}`}>
            {active &&
            buildings[id][f].canBuild !== false &&
            ((turn === 1 && !firstSettlementPlaced) ||
              (turn === 2 && !secondSettlementPlaced)) ? (
              <AiFillHome
                onClick={() => handleClick(id, f)}
                color={
                  !buildings[id][f].user_id
                    ? "white"
                    : buildings[id][f].user_id === 1
                    ? "darkblue"
                    : "red"
                }
              />
            ) : buildings[id][f].canBuild && !buildings[id][f].building_type ? (
              buildSettlement && (
                <AiFillHome
                  onClick={() => handleClick(id, f)}
                  color={"white"}
                />
              )
            ) : buildings[id][f].building_type === 1 ? (
              <AiFillHome
                onClick={
                  buildCity && buildings[id][f].user_id === user.user_id
                    ? () => handleCityClick(id, f)
                    : null
                }
                color={buildings[id][f].user_id === 1 ? "darkblue" : "red"}
              />
            ) : buildings[id][f].building_type === 2 ? (
              <FaBuilding
                color={buildings[id][f].user_id === 1 ? "darkblue" : "red"}
              />
            ) : null}
          </div>
        ))
    )
  }

  return <>{settle()}</>
}

export default Settlements
