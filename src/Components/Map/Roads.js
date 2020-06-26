import React, {useContext} from 'react';
import { UserContext } from "../../context/UserContext"
import { useSelector } from "react-redux"

const Roads = ({handleRoadClick, id}) => {
    // const dispatch = useDispatch()
    // const { user, socket } = useContext(UserContext)
    const { buildRoad, roads } = useSelector((redux) => redux)

    const road = () => {
        const placements = [
                [0, 1, 2, 3, 4, 5], 
                [1, 2, 3, 4], 
                [0, 1], 
                [0, 2, 5], 
                [0, 5], 
                [0, 3, 5], 
                [4, 5]]

        return [[1, 3, 8, 10, 12, 17, 19], 
                [2, 9, 11, 18], 
                [4], 
                [7], 
                [5, 15], 
                [13], 
                [16]]
                .map((e,i) => e.includes(id) 
                && placements[i]
                .map((f,i) => <div
                    key={i} 
                    onClick={(buildRoad && !roads[id][f].hexagon_id) ? () => handleRoadClick(id, f) : null} 
                    className={`road${f}`} 
                    style={
                        roads[id][f].hexagon_id ?
                        {background: roads[id][f].user_id === 1 ? "blue" : "red"} :
                        buildRoad ? {outline: "1px solid black"} : null}
                        
                        ></div>)) 


                        // !roads[id][f].slot_id ?
                        // (buildRoad && {outline: "1px solid black"}) : 
                        // {background: roads[id][f].user_id === 1 ? "blue" : "red"}}>{id, f}</div>))
    }
    
    return (
        <div className="roads-container">
            {
                road()
            }
        </div>
    )
}

export default Roads;