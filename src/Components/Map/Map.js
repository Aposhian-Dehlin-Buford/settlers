import React from "react"
import "./Map.scss"
import { useSelector } from "react-redux"

const Map = () => {
  const { map } = useSelector(({ gameReducer }) => gameReducer)

  const mappedMap = map.map((e, i) =>
    e.map((f, j) => {
      return (
        <div
          key={j}
          className={i % 2 ? "hexagon" : "hexagon-odd"}
          style={{
            background:
              i % 2 === 0 && j === 8
                ? "blue"
                : f.terrain === "water"
                ? "blue"
                : f.terrain === "wheat"
                ? "khaki"
                : f.terrain === "sheep"
                ? "green"
                : f.terrain === "wood"
                ? "darkgreen"
                : f.terrain === "rock"
                ? "grey"
                : f.terrain === "clay"
                ? "brown"
                : f.terrain === "desert"
                ? "tan"
                : f.terrain === "port"
                ? "radial-gradient(blue, black)"
                : "blue",
          }}
        >
          {f.number ? <div key={`${i}-${j}`} className="number-container">{f.number}</div> : null}
        </div>
      )
    })
  )

  return <div className="map-container">{mappedMap}</div>
}

export default Map
