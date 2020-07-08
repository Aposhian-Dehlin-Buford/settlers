import React, {useContext} from "react"
import PurchaseItem from "./PurchaseItem"
import "./Purchase.scss"
import { useSelector, useDispatch } from "react-redux"
import {UserContext} from '../context/UserContext'
import {
  updateResources,
  setBuildSettlement,
  setBuildRoad,
  setBuildCity,
} from "../redux/gameReducer"

const options = [
  { name: "Road", cost: { wood: 1, clay: 1, sheep: 0, wheat: 0, rock: 0 } },
  {
    name: "Settlement",
    cost: { wood: 1, clay: 1, wheat: 1, sheep: 1, rock: 0 },
  },
  { name: "City", cost: { wheat: 2, rock: 3, wood: 0, clay: 0, sheep: 0 } },
  {
    name: "Development",
    cost: { sheep: 1, wheat: 1, rock: 1, clay: 0, wood: 0 },
  },
]

const Purchase = () => {
  const { room, buildSettlement, buildCity, buildRoad } = useSelector(
    (redux) => redux
  )
  const { user, socket } = useContext(UserContext)
  const dispatch = useDispatch()
  console.log(buildSettlement)
  return (
    <div className="purchase-container" style={{borderColor: user.user_id === 1 ? "darkblue" : "red"}}>
      <div 
        className="building-costs" 
        style={{background: user.user_id === 1 ? "darkblue" : "red"}}>Building Costs
      </div>
      {options.map(({ cost, name }, i) => (
        <PurchaseItem key={i} cost={cost} name={name} index={i} />
      ))}
      {(buildSettlement || buildCity || buildRoad) && (
        <button
          onClick={() => {
            if (buildRoad) {
              dispatch(updateResources(options[0].cost))
              socket.emit('update-opponent-res', {room, oppRes: Object.values(options[0].cost).reduce((a, v) => {
                return (a += v)
              }, 0)})
              dispatch(setBuildRoad(false))
            } else if (buildSettlement) {
              dispatch(updateResources(options[1].cost))
              socket.emit('update-opponent-res', {room, oppRes: Object.values(options[1].cost).reduce((a, v) => {
                return (a += v)
              }, 0)})
              dispatch(setBuildSettlement(false))
            } else if (buildCity) {
              dispatch(updateResources(options[2].cost))
              socket.emit('update-opponent-res', {room, oppRes: Object.values(options[2].cost).reduce((a, v) => {
                return (a += v)
              }, 0)})
              dispatch(setBuildCity(false))
            }
          }}
        >
          Cancel
        </button>
      )}
    </div>
  )
}

export default Purchase
