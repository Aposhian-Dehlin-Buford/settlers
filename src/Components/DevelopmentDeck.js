import React from 'react'
import { useSelector } from 'react-redux'

const DevelopmentDeck = () => {
    const {developmentDeck} = useSelector(({gameReducer}) => gameReducer)
    return(
        <div>Deck: {developmentDeck.length}</div>
    )
}

export default DevelopmentDeck