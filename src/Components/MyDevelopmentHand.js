import React from "react"
import { useSelector } from "react-redux"

const MyDevelopmentHand = () => {
  const { developmentHand } = useSelector(({ gameReducer }) => gameReducer)
  return (
    <div>
      {developmentHand.map((e, i) => (
        <div key={i} className={e}>
          {e}
        </div>
      ))}
    </div>
  )
}

export default MyDevelopmentHand
