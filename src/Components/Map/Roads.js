import React, {useContext} from 'react';
import { UserContext } from "../../context/UserContext"
import { useSelector } from "react-redux"

const Roads = ({handleRoadClick, id}) => {
    // const dispatch = useDispatch()
    // const { user, socket } = useContext(UserContext)
    const { buildRoad, roads } = useSelector((redux) => redux)

    const road = () => {
        const placements = [[1], [0,1], [0], [1,2], [2], [0,1,2]]

        return [[0],
                [1,2], 
                [3,8,14], 
                [4,9], 
                [15,22,28],
                [5,6,7,10,11,12,13,16,17,18,19,20,23,24,25,26,29,30,31]]
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