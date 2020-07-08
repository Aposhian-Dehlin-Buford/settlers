import React, { useState, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import OfferResource from "./OfferResource"
import { updateTradePending } from "../redux/gameReducer"
import {UserContext} from '../context/UserContext'
import {GoPerson} from 'react-icons/go'
import './Trade.scss'

const OfferTrade = () => {
  const dispatch = useDispatch()
  const { user, socket} = useContext(UserContext)
  const { active, rolledDice, room, tradePending, players } = useSelector((redux) => redux)
  const { sheep, wheat, wood, clay, rock } = useSelector((redux) => redux.resources)
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

  const toOffer = offerClay + offerWood + offerWheat + offerRock + offerSheep > 0 &&
  forClay + forWood + forWheat + forRock + forSheep > 0

  const offerPlayers = players.map(e => e.user_id).filter(e => e != user.user_id).map((e,i) => <div key={i} onClick={toOffer ? requestTrade : null} className="offer-players-circles" style={{background: e === 1 ? "darkblue" : "red", borderColor: toOffer && "darkgreen", boxShadow: toOffer && "0 0 5px 1px lightblue"}}><GoPerson color={e === 1 ? "lightblue" : "darkred"} /></div>)

  return (
    <div className="offer-trade-container">
      {active && rolledDice && !tradePending && (
      <div className="offer-trade-container2">
      <div className="offer-players">{ offerPlayers }</div>
      
        <div className="offer-container">
        
          <div className="offers">
            <div style={{textAlign: 'center'}}>Offer:</div>
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
          <div className="for">
            <div style={{textAlign: 'center'}}>For: </div>
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
        </div>
      </div>
      )}
    </div>
  )
}

export default OfferTrade
