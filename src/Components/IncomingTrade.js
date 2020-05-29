import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateIncomingTrade } from "../redux/gameReducer"

const IncomingTrade = () => {
  const dispatch = useDispatch()
  const { socket } = useSelector(({ authReducer }) => authReducer)
  const { room } = useSelector(({ gameReducer }) => gameReducer)
  const { offer, request } = useSelector(
    ({ gameReducer }) => gameReducer.incomingTrade
  )
  const { offerWood, offerClay, offerWheat, offerSheep, offerRock } = offer
  const { forWood, forClay, forWheat, forSheep, forRock } = request
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
          <button
            onClick={() => {
              socket.emit("accept-offer", { room, offer, request })
              dispatch(updateIncomingTrade(null))
            }}
          >
            Accept
          </button>
          <button
            onClick={() => {
              socket.emit("reject-offer", { room })
              dispatch(updateIncomingTrade(null))
            }}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  )
}

export default IncomingTrade
