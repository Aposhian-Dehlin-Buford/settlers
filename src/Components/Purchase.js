import React from "react"
import PurchaseItem from "./PurchaseItem"
import './Purchase.scss'

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

const Purchase = (props) => {
  const {buildSettlement, setBuildSettlement} = props
  return (
    <div className="purchase-container">
      {options.map(({ cost, name }, i) => (
        <PurchaseItem buildSettlement={buildSettlement} setBuildSettlement={setBuildSettlement} key={i} cost={cost} name={name} />
      ))}
    </div>
  )
}

export default Purchase
