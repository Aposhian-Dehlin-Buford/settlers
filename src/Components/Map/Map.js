import React from "react"
import "./Map.scss"
import "./Settlements.scss"
import "./Roads.scss"
import "./Ports.scss"
import { useSelector } from "react-redux"
import Hexagon from './Hexagon';

const Map = ({handlePort, handleRobber}) => {
  const { map } = useSelector((redux) => redux)
  return (
    <div className="map-container">
      <div className="hexagon-row1">
        {map.slice(0, 4).map((e,i) => <Hexagon handleRobber={handleRobber} handlePort={handlePort} e={e} i={i} id={e.id} key={e.id} />)}
      </div>
      <div className="hexagon-row2">
        {map.slice(4, 9).map((e,i) => <Hexagon handleRobber={handleRobber} handlePort={handlePort} e={e} i={i}  id={e.id} key={e.id} />)}
      </div>
      <div className="hexagon-row3">
        {map.slice(9, 15).map((e,i) => <Hexagon handleRobber={handleRobber} handlePort={handlePort} e={e} i={i}  id={e.id} key={e.id} />)}
      </div>
      <div className="hexagon-row4">
        {map.slice(15, 22).map((e,i) => <Hexagon handleRobber={handleRobber} handlePort={handlePort} e={e} i={i}  id={e.id} key={e.id} />)}
      </div>
      <div className="hexagon-row5">
        {map.slice(22, 28).map((e,i) => <Hexagon handleRobber={handleRobber} handlePort={handlePort} e={e} i={i}  id={e.id} key={e.id} />)}
      </div>
      <div className="hexagon-row6">
        {map.slice(28, 33).map((e,i) => <Hexagon handleRobber={handleRobber} handlePort={handlePort} e={e} i={i}  id={e.id} key={e.id} />)}
      </div>
      <div className="hexagon-row7">
        {map.slice(33, 37).map((e,i) => <Hexagon handleRobber={handleRobber} handlePort={handlePort} e={e} i={i}  id={e.id} key={e.id} />)}
      </div>
    </div>
    )
}

export default Map;
