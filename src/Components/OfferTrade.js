import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import OfferResource from "./OfferResource"
import { updateTradePending } from "../redux/gameReducer"

const OfferTrade = () => {
  const dispatch = useDispatch()
  const { socket } = useSelector(({ authReducer }) => authReducer)
  const { active, rolledDice, room, tradePending } = useSelector(
    ({ gameReducer }) => gameReducer
  )
  const { sheep, wheat, wood, clay, rock } = useSelector(
    ({ gameReducer }) => gameReducer.resources
  )
  const [offerSheep, setOffSheep] = useState(0)
  const [offerWood, setOffWood] = useState(0)
  const [offerClay, setOffClay] = useState(0)
  const [offerWheat, setOffWheat] = useState(0)
  const [offerRock, setOffRock] = useState(0)
  const [forSheep, setForSheep] = useState(0)
  const [forWood, setForWood] = useState(0)
  const [forClay, setForClay] = useState(0)
  const [forWheat, setForWheat] = useState(0)
  const [forRock, setForRock] = useState(0)
  const resources = [
    { name: "Sheep", resource: sheep, offer: offerSheep, action: setOffSheep },
    { name: "Wheat", resource: wheat, offer: offerWheat, action: setOffWheat },
    { name: "Wood", resource: wood, offer: offerWood, action: setOffWood },
    { name: "Clay", resource: clay, offer: offerClay, action: setOffClay },
    { name: "Rock", resource: rock, offer: offerRock, action: setOffRock },
  ]

  const forResources = [
    { name: "Sheep", resource: 4, offer: forSheep, action: setForSheep },
    { name: "Wheat", resource: 4, offer: forWheat, action: setForWheat },
    { name: "Wood", resource: 4, offer: forWood, action: setForWood },
    { name: "Clay", resource: 4, offer: forClay, action: setForClay },
    { name: "Rock", resource: 4, offer: forRock, action: setForRock },
  ]

  const resetFields = () => {
    setForSheep(0)
    setForWheat(0)
    setForClay(0)
    setForRock(0)
    setForWood(0)
    setOffWood(0)
    setOffRock(0)
    setOffClay(0)
    setOffWheat(0)
    setOffSheep(0)
  }

  const requestTrade = () => {
    socket.emit("request-trade", {
      offer: {
        offerClay,
        offerWood,
        offerWheat,
        offerRock,
        offerSheep,
      },
      request: { forClay, forWood, forWheat, forRock, forSheep },
      room,
    })
    resetFields()
    dispatch(updateTradePending(true))
  }

  return (
    <div>
      {active && rolledDice && !tradePending && (
        <div>
          <div>
            <div>Offer:</div>
            {resources.map(({ name, resource, offer, action }, i) => (
              <OfferResource
                key={i}
                name={name}
                offer={offer}
                resource={resource}
                action={action}
              />
            ))}
          </div>
          <div>
            <div>For: </div>
            {forResources.map(({ name, resource, offer, action }, i) => (
              <OfferResource
                key={i}
                name={name}
                offer={offer}
                resource={resource}
                action={action}
              />
            ))}
          </div>
          {offerClay + offerWood + offerWheat + offerRock + offerSheep > 0 &&
            forClay + forWood + forWheat + forRock + forSheep > 0 && (
              <button onClick={requestTrade}>Request Trade</button>
            )}
        </div>
      )}
    </div>
  )
}

export default OfferTrade
