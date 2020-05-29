import React from 'react'
import { useSelector } from 'react-redux'

const MyHand = () => {
    const {resources} = useSelector(({gameReducer}) => gameReducer)
    return(
        <div>My Hand</div>
    )
}

export default MyHand