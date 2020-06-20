import React, { useContext } from "react"
import { BsHouseFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import {
  setBuildSettlement,
  updateBuildings,
  setMapState,
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
  // const { user, socket } = useSelector(({ authReducer }) => authReducer)
  const { buildSettlement, room, buildings, map } = useSelector(
    ({ gameReducer }) => gameReducer
  )

  // useEffect(() => {

  // }, [buildings[id]])

  const handleClick = (id, slotNum) => {
    let buildingsArray = buildings.slice()
    const mapArray = [...map]
    // console.log("click", buildingsArray)
    const building = {
      hexagon_id: id,
      slot_id: slotNum,
      user_id: user.user_id,
      building_type: 1,
      adjacent_numbers: [],
    }
    console.log(slotNum)
    mapArray[id - 1].slots[slotNum][3] = 1
    mapArray[id - 1].slots[slotNum][4] = user.user_id
    dispatch(setMapState(mapArray))
    buildingsArray[id] = building
    // console.log("click2", buildingsArray)
    // console.log(mapArray)
    dispatch(setBuildSettlement(false))
    dispatch(updateBuildings(buildingsArray))
    socket.emit("buy-building", { room, buildingsArray, map: mapArray })
  }

  // console.log("buildings", buildings)
  // console.log("map2", map)
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
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container1"
                  onClick={() => handleClick(id, 1)}
                ></div>
              ) : (
                <div className="settlement1">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 1 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container2"
                  onClick={() => handleClick(id, 2)}
                ></div>
              ) : (
                <div className="settlement2">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 2 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container3"
                  onClick={() => handleClick(id, 3)}
                ></div>
              ) : (
                <div className="settlement3">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 3 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container4"
                  onClick={() => handleClick(id, 4)}
                ></div>
              ) : (
                <div className="settlement4">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 4 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container5"
                  onClick={() => handleClick(id, 5)}
                ></div>
              ) : (
                <div className="settlement5">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 5 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container6"
                  onClick={() => handleClick(id, 6)}
                ></div>
              ) : (
                <div className="settlement6">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 6 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
            </>
          ) : id === 2 || id === 9 || id === 11 || id === 18 ? (
            <>
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container2"
                  onClick={() => handleClick(id, 2)}
                ></div>
              ) : (
                <div className="settlement2">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 2 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container5"
                  onClick={() => handleClick(id, 5)}
                ></div>
              ) : (
                <div className="settlement5">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 5 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
            </>
          ) : id === 4 ? (
            <>
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container1"
                  onClick={() => handleClick(id, 1)}
                ></div>
              ) : (
                <div className="settlement1">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 1 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
            </>
          ) : id === 7 ? (
            <>
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container3"
                  onClick={() => handleClick(id, 3)}
                ></div>
              ) : (
                <div className="settlement3">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 3 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
            </>
          ) : id === 13 ? (
            <>
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container4"
                  onClick={() => handleClick(id, 4)}
                ></div>
              ) : (
                <div className="settlement4">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 4 && (
                    <BsHouseFill color={user.user_id === 1 ? "blue" : "red"} />
                  )}
                </div>
              )}
            </>
          ) : id === 16 ? (
            <>
              {!buildings[id].slot_id ? (
                <div
                  className="settlement-container6"
                  onClick={() => handleClick(id, 6)}
                ></div>
              ) : (
                <div className="settlement6">
                  {buildings[id].hexagon_id && buildings[id].slot_id === 6 && (
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
              <div className="settlement1">
                {buildings[id].hexagon_id && buildings[id].slot_id === 1 && (
                  <BsHouseFill
                    color={buildings[id].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement2">
                {buildings[id].hexagon_id && buildings[id].slot_id === 2 && (
                  <BsHouseFill
                    color={buildings[id].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement3">
                {buildings[id].hexagon_id && buildings[id].slot_id === 3 && (
                  <BsHouseFill
                    color={buildings[id].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement4">
                {buildings[id].hexagon_id && buildings[id].slot_id === 4 && (
                  <BsHouseFill
                    color={buildings[id].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement5">
                {buildings[id].hexagon_id && buildings[id].slot_id === 5 && (
                  <BsHouseFill
                    color={buildings[id].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement6">
                {buildings[id].hexagon_id && buildings[id].slot_id === 6 && (
                  <BsHouseFill
                    color={buildings[id].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
            </>
          ) : id === 2 || id === 9 || id === 11 || id === 18 ? (
            <>
              <div className="settlement2">
                {buildings[id].hexagon_id && buildings[id].slot_id === 2 && (
                  <BsHouseFill
                    color={buildings[id].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
              <div className="settlement5">
                {buildings[id].hexagon_id && buildings[id].slot_id === 5 && (
                  <BsHouseFill
                    color={buildings[id].user_id === 1 ? "blue" : "red"}
                  />
                )}
              </div>
            </>
          ) : id === 4 ? (
            <div className="settlement1">
              {buildings[id].hexagon_id && buildings[id].slot_id === 1 && (
                <BsHouseFill
                  color={buildings[id].user_id === 1 ? "blue" : "red"}
                />
              )}
            </div>
          ) : id === 7 ? (
            <div className="settlement3">
              {buildings[id].hexagon_id && buildings[id].slot_id === 3 && (
                <BsHouseFill
                  color={buildings[id].user_id === 1 ? "blue" : "red"}
                />
              )}
            </div>
          ) : id === 13 ? (
            <div className="settlement4">
              {buildings[id].hexagon_id && buildings[id].slot_id === 4 && (
                <BsHouseFill
                  color={buildings[id].user_id === 1 ? "blue" : "red"}
                />
              )}
            </div>
          ) : id === 16 ? (
            <div className="settlement6">
              {buildings[id].hexagon_id && buildings[id].slot_id === 6 && (
                <BsHouseFill
                  color={buildings[id].user_id === 1 ? "blue" : "red"}
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
