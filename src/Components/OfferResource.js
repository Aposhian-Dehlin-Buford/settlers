import React from "react"

const OfferResource = ({ name, offer, resource, action }) => {
  return (
    <div className="offer-resource-container">
      
      <button onClick={() => (offer > 0 ? action((s) => s - 1) : null)}>
          {offer > 0 && "-"}
        </button>
      <div 
        className="offer-resource"
        style={{backgroundImage: 'url(' + require(`../images/${name.toLowerCase()}-alt.png`) + ')'}} 
        onClick={() => (offer < resource ? action((s) => s + 1) : null)}>
          {resource === 0 && <div className="offer-resource-overlay"></div>}
          {offer > 0 && offer}
      </div>
    </div>
  )
}

export default OfferResource
