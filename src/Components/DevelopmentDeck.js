import React from 'react'
import { useSelector } from 'react-redux'

const DevelopmentDeck = () => {
    const {developmentDeck} = useSelector((redux) => redux)
    return(
        <div></div>
    )
}

export default DevelopmentDeck