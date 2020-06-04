import React from "react"
import { BsHouseFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import {
  setBuildSettlement,
  updateBuildings,
} from "../../redux/gameReducer"

const buildingArrayExample = [
  {
    hexagon_id: 3,
    slot_id: 3,
    owner: 1,
    building_type: 1,
    adjacent_numbers: [6, 12, 3],
  },
]

const Hexagon = ({ e, id }) => {
  const dispatch = useDispatch()
  const { user, socket } = useSelector(({ authReducer }) => authReducer)
  const { buildSettlement, room } = useSelector(
    ({ gameReducer }) => gameReducer
  )
  const handleClick = (id, slotNum) => {
    const building = {
      hexagon_id: id,
      slot_id: slotNum,
      user_id: user.user_id,
      building_type: 1,
      adjacent_numbers: [],
    }
    dispatch(setBuildSettlement(false))
    dispatch(updateBuildings(building))
    socket.emit("buy-building", { room, building })
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
      {e.number ? <div className="number-container">{e.number}</div> : null}

      {buildSettlement ? (
        <div className="settlement-container">
          {id === 1 ||
          id === 3 ||
          id === 8 ||
          id === 10 ||
          id === 12 ||
          id === 17 ||
          id === 19 ? (
            <>
              <div
                className="settlement-container1"
                onClick={() => handleClick(id, 1)}
              ></div>
              <div
                className="settlement-container2"
                onClick={() => handleClick(id, 2)}
              ></div>
              <div
                className="settlement-container3"
                onClick={() => handleClick(id, 3)}
              ></div>
              <div
                className="settlement-container4"
                onClick={() => handleClick(id, 4)}
              ></div>
              <div
                className="settlement-container5"
                onClick={() => handleClick(id, 5)}
              ></div>
              <div
                className="settlement-container6"
                onClick={() => handleClick(id, 6)}
              ></div>
            </>
          ) : id === 2 || id === 9 || id === 11 || id === 18 ? (
            <>
              <div
                className="settlement-container2"
                onClick={() => handleClick(id, 2)}
              ></div>
              <div
                className="settlement-container5"
                onClick={() => handleClick(id, 5)}
              ></div>
            </>
          ) : id === 4 ? (
            <div
              className="settlement-container1"
              onClick={() => handleClick(id, 1)}
            ></div>
          ) : id === 7 ? (
            <div
              className="settlement-container3"
              onClick={() => handleClick(id, 3)}
            ></div>
          ) : id === 13 ? (
            <div
              className="settlement-container4"
              onClick={() => handleClick(id, 4)}
            ></div>
          ) : id === 16 ? (
            <div
              className="settlement-container6"
              onClick={() => handleClick(id, 6)}
            ></div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default Hexagon
