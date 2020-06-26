import React,  {useContext} from 'react'
import {useSelector} from 'react-redux'
import { UserContext } from "../../context/UserContext"
import { BsHouseDoorFill } from "react-icons/bs"
import { FaBuilding } from "react-icons/fa"


const Settlements = (props) => {
    const {id, handleClick, handleCityClick, user} = props

    const { buildSettlement, buildCity, buildings} = useSelector((redux) => redux)
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
            .map((f,j) => <div
              key={j} 
              className={`settlement-container${f}`}>
                  { 
                    buildings[id][f].canBuild === false ? null :
                    !buildings[id][f].building_type ?
                      (buildSettlement &&
                      <BsHouseDoorFill 
                        onClick={() => handleClick(id, f)}
                        color={"white"} />) :

                    buildings[id][f].building_type === 1 ?
                      <BsHouseDoorFill
                        onClick={
                          (buildCity && buildings[id][f].user_id === user.user_id) ? () => handleCityClick(id, f) : null} 
                        color={buildings[id][f].user_id === 1 ? 
                          "blue" : "red"} /> :

                    buildings[id][f].building_type === 2 ?
                      <FaBuilding 
                        color={
                          buildings[id][f].user_id === 1 ? "blue" : "red"
                              } /> : null
                      }</div>))
        }

    // console.log("buildings", buildings, buildSettlement)
    // console.log("user", user)
    return (
        <>
        {settle()}
        </>
    )
        
}

export default Settlements;