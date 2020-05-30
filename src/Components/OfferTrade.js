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
  const [offerSheep, setOfferSheep] = useState(0)
  const [offerWood, setOfferWood] = useState(0)
  const [offerClay, setOfferClay] = useState(0)
  const [offerWheat, setOfferWheat] = useState(0)
  const [offerRock, setOfferRock] = useState(0)
  const [forSheep, setForSheep] = useState(0)
  const [forWood, setForWood] = useState(0)
  const [forClay, setForClay] = useState(0)
  const [forWheat, setForWheat] = useState(0)
  const [forRock, setForRock] = useState(0)
  const resources = [
    {
      name: "Sheep",
      resource: sheep,
      offer: offerSheep,
      action: setOfferSheep,
    },
    {
      name: "Wheat",
      resource: wheat,
      offer: offerWheat,
      action: setOfferWheat,
    },
    { name: "Wood", resource: wood, offer: offerWood, action: setOfferWood },
    { name: "Clay", resource: clay, offer: offerClay, action: setOfferClay },
    { name: "Rock", resource: rock, offer: offerRock, action: setOfferRock },
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
    setOfferWood(0)
    setOfferRock(0)
    setOfferClay(0)
    setOfferWheat(0)
    setOfferSheep(0)
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
          <button
            onClick={() => {
              if (
                offerClay + offerWood + offerWheat + offerRock + offerSheep >
                  0 &&
                forClay + forWood + forWheat + forRock + forSheep > 0
              ) {
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
            }}
          >
            Request Trade
          </button>
        </div>
      )}
    </div>
  )
}

export default OfferTrade
