import React, { useEffect, useContext, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateIncomingTrade, updateResources } from "../redux/gameReducer"
import {UserContext} from '../context/UserContext'
import {TweenMax} from 'gsap'

const IncomingTrade = () => {
  const dispatch = useDispatch()
  const { user, socket} = useContext(UserContext)
  const { room, incomingTrade } = useSelector((redux) => redux)
  const { offer, request } = useSelector((redux) => redux.incomingTrade)
  const { sheep, wheat, wood, clay, rock } = useSelector((redux) => redux.resources)
  const { offerWood, offerClay, offerWheat, offerSheep, offerRock } = offer
  const { forWood, forClay, forWheat, forSheep, forRock } = request
  let animate = useRef(null)

  useEffect(() => {
    TweenMax.to(
      animate, 
      .5,
      {
        opacity: 1
      }
    )
  }, [])

  const acceptTrade = () => {
    socket.emit("accept-offer", { room, offer, request })
    dispatch(updateIncomingTrade(null))
    let tradeRes = {
      wood: offer.offerWood - request.forWood,
      clay: offer.offerClay - request.forClay,
      wheat: offer.offerWheat - request.forWheat,
      sheep: offer.offerSheep - request.forSheep,
      rock: offer.offerRock - request.forRock,
    }
    dispatch(
      updateResources(tradeRes)
    )
    socket.emit('update-opponent-res', {room, oppRes: Object.values(tradeRes).reduce((a, v) => {
      return (a += v)
    }, 0)})
  }
  const rejectTrade = () => {
    socket.emit("reject-offer", { room })
    dispatch(updateIncomingTrade(null))
  }

  return (
    
        <div className="incoming-trade-container" ref={el => {animate = el}}>
          <div className="incoming-trade-title" style={{background: user.user_id === 1 ? "red" : "darkblue"}}><span>Incoming Request</span></div>
          <div className="incoming-title">You Receive:</div>
          <div className="incoming-offer">
            {offerWood > 0 && <div style={{backgroundImage: 'url(' + require(`../images/wood-alt.png`) + ')'}}><span>{offerWood}</span></div>}
            {offerSheep > 0 && <div style={{backgroundImage: 'url(' + require(`../images/sheep-alt.png`) + ')'}}><span>{offerSheep}</span></div>}
            {offerClay > 0 && <div style={{backgroundImage: 'url(' + require(`../images/clay-alt.png`) + ')'}}><span>{offerClay}</span></div>}
            {offerWheat > 0 && <div style={{backgroundImage: 'url(' + require(`../images/wheat-alt.png`) + ')'}}><span>{offerWheat}</span></div>}
            {offerRock > 0 && <div style={{backgroundImage: 'url(' + require(`../images/rock-alt.png`) + ')'}}><span>{offerRock}</span></div>}
          </div>
            <div className="incoming-title">You Lose:</div>
          <div className="incoming-offer">
            {forWood > 0 && <div style={{backgroundImage: 'url(' + require(`../images/wood-alt.png`) + ')'}}>{forWood}</div>}
            {forSheep > 0 && <div style={{backgroundImage: 'url(' + require(`../images/sheep-alt.png`) + ')'}}>{forSheep}</div>}
            {forClay > 0 && <div style={{backgroundImage: 'url(' + require(`../images/clay-alt.png`) + ')'}}>{forClay}</div>}
            {forWheat > 0 && <div style={{backgroundImage: 'url(' + require(`../images/wheat-alt.png`) + ')'}}>{forWheat}</div>}
            {forRock > 0 && <div style={{backgroundImage: 'url(' + require(`../images/rock-alt.png`) + ')'}}>{forRock}</div>}
          </div>
          <div className="incoming-trade-buttons">
             
              
              {
              (wood >= forWood &&
              wheat >= forWheat &&
              clay >= forClay &&
              sheep >= forSheep &&
              rock >= forRock) && <div className="accept-trade" onClick={acceptTrade}><span>Accept</span></div>
              }
              
            <div className="reject-trade" onClick={rejectTrade}><span>Reject</span></div>
          </div>
        </div>
      
  )
}

export default IncomingTrade
