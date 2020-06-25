import React, {useContext} from 'react';
import { UserContext } from "../../context/UserContext"

const Roads = () => {
    // const dispatch = useDispatch()
    // const { user, socket } = useContext(UserContext)
    // const { buildSettlement, room, buildings, map, numBuildings } = useSelector(
    // (redux) => redux
    // )
    
    return (
        <div className="roads-container">
            <div className="road0"></div>
            <div className="road1"></div>
            <div className="road2"></div>
            <div className="road3"></div>
            <div className="road4"></div>
            <div className="road5"></div>
        </div>
    )
}

export default Roads;