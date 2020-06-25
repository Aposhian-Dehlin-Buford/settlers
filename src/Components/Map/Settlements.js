import React,  {useContext} from 'react'
import {useSelector} from 'react-redux'
import { UserContext } from "../../context/UserContext"
import { BsHouseFill } from "react-icons/bs"

const Settlements = (props) => {
    const {id, handleClick} = props

    const { buildSettlement, buildings} = useSelector((redux) => redux)

    return (
        <>
        {buildSettlement ? (
            <div className="settlement-container">
              {id === 1 || id === 3 || id === 8 || id === 10 || id === 12 || id === 17 || id === 19 ? (
                <>
                  {!buildings[id][0].hexagon_id ? (
                    <div
                      className="settlement-container0"
                      onClick={() => handleClick(id, 0)}
                    ></div>
                  ) : (
                    <div className="settlement0">
                      {buildings[id][0].hexagon_id && buildings[id][0].slot_id === 0 && (
                        <BsHouseFill color={buildings[id][0].user_id  === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                  {!buildings[id][1].hexagon_id ? (
                    <div
                      className="settlement-container1"
                      onClick={() => handleClick(id, 1)}
                    ></div>
                  ) : (
                    <div className="settlement1">
                      {buildings[id][1].hexagon_id && buildings[id][1].slot_id === 1 && (
                        <BsHouseFill color={buildings[id][1].user_id  === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                  {!buildings[id][2].hexagon_id ? (
                    <div
                      className="settlement-container2"
                      onClick={() => handleClick(id, 2)}
                    ></div>
                  ) : (
                    <div className="settlement2">
                      {buildings[id][2].hexagon_id && buildings[id][2].slot_id === 2 && (
                        <BsHouseFill color={buildings[id][2].user_id  === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                  {!buildings[id][3].hexagon_id ? (
                    <div
                      className="settlement-container3"
                      onClick={() => handleClick(id, 3)}
                    ></div>
                  ) : (
                    <div className="settlement3">
                      {buildings[id][3].hexagon_id && buildings[id][3].slot_id === 3 && (
                        <BsHouseFill color={buildings[id][3].user_id  === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                  {!buildings[id][4].hexagon_id ? (
                    <div
                      className="settlement-container4"
                      onClick={() => handleClick(id, 4)}
                    ></div>
                  ) : (
                    <div className="settlement4">
                      {buildings[id][4].hexagon_id && buildings[id][4].slot_id === 4 && (
                        <BsHouseFill color={buildings[id][4].user_id  === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                  {!buildings[id][5].hexagon_id ? (
                    <div
                      className="settlement-container5"
                      onClick={() => handleClick(id, 5)}
                    ></div>
                  ) : (
                    <div className="settlement5">
                      {buildings[id][5].hexagon_id && buildings[id][5].slot_id === 5 && (
                        <BsHouseFill color={buildings[id][5].user_id  === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                </>
              ) : id === 2 || id === 9 || id === 11 || id === 18 ? (
                <>
                  {!buildings[id][1].hexagon_id ? (
                    <div
                      className="settlement-container1"
                      onClick={() => handleClick(id, 1)}
                    ></div>
                  ) : (
                    <div className="settlement1">
                      {buildings[id][1].hexagon_id && buildings[id][1].slot_id === 1 && (
                        <BsHouseFill color={buildings[id][1].user_id  === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                  {!buildings[id][4].hexagon_id ? (
                    <div
                      className="settlement-container4"
                      onClick={() => handleClick(id, 4)}
                    ></div>
                  ) : (
                    <div className="settlement4">
                      {buildings[id][4].hexagon_id && buildings[id][4].slot_id === 4 && (
                        <BsHouseFill color={buildings[id][4].user_id  === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                </>
              ) : id === 4 ? (
                <>
                  {!buildings[id][0].hexagon_id ? (
                    <div
                      className="settlement-container0"
                      onClick={() => handleClick(id, 0)}
                    ></div>
                  ) : (
                    <div className="settlement0">
                      {buildings[id][0].hexagon_id && buildings[id][0].slot_id === 0 && (
                        <BsHouseFill color={buildings[id][0].user_id  === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                </>
              ) : id === 7 ? (
                <>
                  {!buildings[id][2].hexagon_id ? (
                    <div
                      className="settlement-container2"
                      onClick={() => handleClick(id, 2)}
                    ></div>
                  ) : (
                    <div className="settlement2">
                      {buildings[id][2].hexagon_id && buildings[id][2].slot_id === 2 && (
                        <BsHouseFill color={buildings[id][2].user_id  === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                </>
              ) : id === 13 ? (
                <>
                  {!buildings[id][3].hexagon_id ? (
                    <div
                      className="settlement-container3"
                      onClick={() => handleClick(id, 3)}
                    ></div>
                  ) : (
                    <div className="settlement3">
                      {buildings[id][3].hexagon_id && buildings[id][3].slot_id === 3 && (
                        <BsHouseFill color={buildings[id][3].user_id  === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                </>
              ) : id === 16 ? (
                <>
                  {!buildings[id][5].hexagon_id ? (
                    <div
                      className="settlement-container5"
                      onClick={() => handleClick(id, 5)}
                    ></div>
                  ) : (
                    <div className="settlement5">
                      {buildings[id][5].hexagon_id && buildings[id][5].slot_id === 5 && (
                        <BsHouseFill color={buildings[id][5].user_id === 1 ? "blue" : "red"} />
                      )}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          ) : (
            <div className="settlements">
              {id === 1 || id === 3 || id === 8 || id === 10 || id === 12 || id === 17 || id === 19 ? (
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
                        color={buildings[id][4].user_id === 1 ? "blue" : "red"}
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
                        color={buildings[id][4].user_id === 1 ? "blue" : "red"}
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
          </>
    )
}

export default Settlements;