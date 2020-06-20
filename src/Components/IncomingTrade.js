import React, {useContext} from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateIncomingTrade, updateResources } from "../redux/gameReducer"
import {UserContext} from '../context/UserContext'

const IncomingTrade = () => {
  const dispatch = useDispatch()
  const {socket} = useContext(UserContext)
  // const { socket } = useSelector(({ authReducer }) => authReducer)
  const { room } = useSelector((redux) => redux)
  const { offer, request } = useSelector((redux) => redux.incomingTrade)
  const { sheep, wheat, wood, clay, rock } = useSelector((redux) => redux.resources)
  const { offerWood, offerClay, offerWheat, offerSheep, offerRock } = offer
  const { forWood, forClay, forWheat, forSheep, forRock } = request

  const acceptTrade = () => {
    socket.emit("accept-offer", { room, offer, request })
    dispatch(updateIncomingTrade(null))
    dispatch(
      updateResources({
        wood: offer.offerWood - request.forWood,
        clay: offer.offerClay - request.forClay,
        wheat: offer.offerWheat - request.forWheat,
        sheep: offer.offerSheep - request.forSheep,
        rock: offer.offerRock - request.forRock,
      })
    )
  }
  const rejectTrade = () => {
    socket.emit("reject-offer", { room })
    dispatch(updateIncomingTrade(null))
  }

  return (
    <div>
      {offer && (
        <div>
          <div>Incoming Trade</div>
          <div>Offer:</div>
          {offerWood > 0 && <div>Wood: {offerWood}</div>}
          {offerSheep > 0 && <div>Sheep: {offerSheep}</div>}
          {offerClay > 0 && <div>Clay: {offerClay}</div>}
          {offerWheat > 0 && <div>Wheat: {offerWheat}</div>}
          {offerRock > 0 && <div>Rock: {offerRock}</div>}
          <div>For:</div>
          {forWood > 0 && <div>Wood: {forWood}</div>}
          {forSheep > 0 && <div>Sheep: {forSheep}</div>}
          {forClay > 0 && <div>Clay: {forClay}</div>}
          {forWheat > 0 && <div>Wheat: {forWheat}</div>}
          {forRock > 0 && <div>Rock: {forRock}</div>}
          {wood > forWood &&
            wheat > forWheat &&
            clay > forClay &&
            sheep > forSheep &&
            rock > forRock && <button onClick={acceptTrade}>Accept</button>}
          <button onClick={rejectTrade}>Reject</button>
        </div>
      )}
    </div>
  )
}

export default IncomingTrade
