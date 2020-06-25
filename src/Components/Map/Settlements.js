import React,  {useContext} from 'react'
import {useSelector} from 'react-redux'
import { UserContext } from "../../context/UserContext"
import { BsHouseFill } from "react-icons/bs"

const Settlements = (props) => {
    const {id, handleClick} = props

    const { buildSettlement, buildings} = useSelector((redux) => redux)
    const settle = () => {
        const placements = [
                [0, 1, 2, 3, 4, 5], 
                [1, 4], 
                [0], 
                [2], 
                [3], 
                [5]]

        return [[1, 3, 8, 10, 12, 17, 19], 
                [2, 9, 11, 18], 
                [4], 
                [7],  
                [13], 
                [16]]
            .map((e,i) => e
            .includes(id) && placements[i]
            .map(f => <div 
                className={`settlement-container${f}`}
                onClick={() => handleClick(id, f)}>
                    { 
                        <BsHouseFill 
                            color={
                                buildings[id][f].user_id  === 1 ? 
                                "blue" : 
                                buildings[id][f].user_id  === 2 ? 
                                "red" : 
                                buildSettlement ? 
                                    "white" : 
                                    "transparent"
                                } />}</div>))
                    }

    console.log("buildings", buildings, buildSettlement)
    return (
        <>
        {settle()}
        </>
    )
        
}

export default Settlements;