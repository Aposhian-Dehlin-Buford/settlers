import React from "react"

const OfferResource = ({ name, offer, resource, action }) => {
  return (
    <div>
      <div>
        {name}: {offer}/{resource}
      </div>
      <button onClick={() => (offer > 0 ? action((s) => s - 1) : null)}>
        -
      </button>
      <button onClick={() => (offer < resource ? action((s) => s + 1) : null)}>
        +
      </button>
    </div>
  )
}

export default OfferResource
