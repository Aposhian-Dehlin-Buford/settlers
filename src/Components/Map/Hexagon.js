import React, { useContext } from "react"
import { BsHouseFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
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

    // console.log("slotNum", slotNum)
    mapArray[id - 1].slots[slotNum][3] = 1
    mapArray[id - 1].slots[slotNum][4] = user.user_id
    dispatch(setMapState(mapArray))
    numBuildings.push(building)
    buildingsArray[id][slotNum] = building
    dispatch(setBuildSettlement(false))
    dispatch(updateBuildings(buildingsArray))
    socket.emit("buy-building", { room, buildingsArray, map: mapArray })
  }
  // console.log("buildings", buildings)
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
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container0"
                  onClick={() => handleClick(id, 0)}
                ></div>
              ) : (
                <div className="settlement0">
                  {buildings[id][0].hexagon_id && buildings[id][0].slot_id === 0 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container1"
                  onClick={() => handleClick(id, 1)}
                ></div>
              ) : (
                <div className="settlement1">
                  {buildings[id][1].hexagon_id && buildings[id][1].slot_id === 1 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container2"
                  onClick={() => handleClick(id, 2)}
                ></div>
              ) : (
                <div className="settlement2">
                  {buildings[id][2].hexagon_id && buildings[id][2].slot_id === 2 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container3"
                  onClick={() => handleClick(id, 3)}
                ></div>
              ) : (
                <div className="settlement3">
                  {buildings[id][3].hexagon_id && buildings[id][3].slot_id === 3 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container4"
                  onClick={() => handleClick(id, 4)}
                ></div>
              ) : (
                <div className="settlement4">
                  {buildings[id][4].hexagon_id && buildings[id][4].slot_id === 4 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container5"
                  onClick={() => handleClick(id, 5)}
                ></div>
              ) : (
                <div className="settlement5">
                  {buildings[id][5].hexagon_id && buildings[id][5].slot_id === 5 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
            </>
          ) : id === 2 || id === 9 || id === 11 || id === 18 ? (
            <>
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container1"
                  onClick={() => handleClick(id, 1)}
                ></div>
              ) : (
                <div className="settlement1">
                  {buildings[id][1].hexagon_id && buildings[id][1].slot_id === 1 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container4"
                  onClick={() => handleClick(id, 4)}
                ></div>
              ) : (
                <div className="settlement4">
                  {buildings[id][4].hexagon_id && buildings[id][4].slot_id === 4 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
            </>
          ) : id === 4 ? (
            <>
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container0"
                  onClick={() => handleClick(id, 0)}
                ></div>
              ) : (
                <div className="settlement0">
                  {buildings[id][0].hexagon_id && buildings[id][0].slot_id === 0 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
            </>
          ) : id === 7 ? (
            <>
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container2"
                  onClick={() => handleClick(id, 2)}
                ></div>
              ) : (
                <div className="settlement2">
                  {buildings[id][2].hexagon_id && buildings[id][2].slot_id === 2 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
            </>
          ) : id === 13 ? (
            <>
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container3"
                  onClick={() => handleClick(id, 3)}
                ></div>
              ) : (
                <div className="settlement3">
                  {buildings[id][3].hexagon_id && buildings[id][3].slot_id === 3 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
            </>
          ) : id === 16 ? (
            <>
              {!buildings[id].filter(e => e.length > 0)[0] ? (
                <div
                  className="settlement-container5"
                  onClick={() => handleClick(id, 5)}
                ></div>
              ) : (
                <div className="settlement5">
                  {buildings[id][5].hexagon_id && buildings[id][5].slot_id === 5 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
            </>
          ) : null}
        </div>
      ) : (
        <div className="settlements">
          {id === 1 ||
          id === 3 ||
          id === 8 ||
          id === 10 ||
          id === 12 ||
          id === 17 ||
          id === 19 ? (
            <>
              <div className="settlement0">
                {buildings[id][0].hexagon_id && buildings[id][0].slot_id === 0 && (
                  <BsHouseFill
                    color={buildings[id][0].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement1">
                {buildings[id][1].hexagon_id && buildings[id][1].slot_id === 1 && (
                  <BsHouseFill
                    color={buildings[id][1].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement2">
                {buildings[id][2].hexagon_id && buildings[id][2].slot_id === 2 && (
                  <BsHouseFill
                    color={buildings[id][2].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement3">
                {buildings[id][3].hexagon_id && buildings[id][3].slot_id === 3 && (
                  <BsHouseFill
                    color={buildings[id][3].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement4">
                {buildings[id][4].hexagon_id && buildings[id][4].slot_id === 4 && (
                  <BsHouseFill
                    color={buildings[id][5].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement5">
                {buildings[id][5].hexagon_id && buildings[id][5].slot_id === 5 && (
                  <BsHouseFill
                    color={buildings[id][5].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
            </>
          ) : id === 2 || id === 9 || id === 11 || id === 18 ? (
            <>
              <div className="settlement1">
                {buildings[id][1].hexagon_id && buildings[id][1].slot_id === 1 && (
                  <BsHouseFill
                    color={buildings[id][1].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement4">
                {buildings[id][4].hexagon_id && buildings[id][4].slot_id === 4 && (
                  <BsHouseFill
                    color={buildings[id][5].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
            </>
          ) : id === 4 ? (
            <div className="settlement0">
              {buildings[id][0].hexagon_id && buildings[id][0].slot_id === 0 && (
                <BsHouseFill
                  color={buildings[id][0].user_id === 1 ? "blue" : "red"}
                />
              )}
            </div>
          ) : id === 7 ? (
            <div className="settlement2">
              {buildings[id][2].hexagon_id && buildings[id][2].slot_id === 2 && (
                <BsHouseFill
                  color={buildings[id][2].user_id === 1 ? "blue" : "red"}
                />
              )}
            </div>
          ) : id === 13 ? (
            <div className="settlement3">
              {buildings[id][3].hexagon_id && buildings[id][3].slot_id === 3 && (
                <BsHouseFill
                  color={buildings[id][3].user_id === 1 ? "blue" : "red"}
                />
              )}
            </div>
          ) : id === 16 ? (
            <div className="settlement5">
              {buildings[id][5].hexagon_id && buildings[id][5].slot_id === 5 && (
                <BsHouseFill
                  color={buildings[id][5].user_id === 1 ? "blue" : "red"}
                />
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Hexagon
