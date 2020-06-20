import React from "react"
import "./Map.scss"
import "./Settlements.scss"
import { useSelector } from "react-redux"
import Hexagon from './Hexagon';

const Map = () => {
  const { map } = useSelector((redux) => redux)
  return (
    <div className="map-container">
      <div className="hexagon-row1">
        {map.slice(0, 3).map((e,i) => <Hexagon e={e} i={i} id={e.id} key={e.id} />)}
      </div>
      <div className="hexagon-row2">
        {map.slice(3, 7).map((e,i) => <Hexagon e={e} i={i}  id={e.id} key={e.id} />)}
      </div>
      <div className="hexagon-row3">
        {map.slice(7, 12).map((e,i) => <Hexagon e={e} i={i}  id={e.id} key={e.id} />)}
      </div>
      <div className="hexagon-row4">
        {map.slice(12, 16).map((e,i) => <Hexagon e={e} i={i}  id={e.id} key={e.id} />)}
      </div>
      <div className="hexagon-row5">
        {map.slice(16, 19).map((e,i) => <Hexagon e={e} i={i}  id={e.id} key={e.id} />)}
      </div>
    </div>
    )
}

export default Map;
