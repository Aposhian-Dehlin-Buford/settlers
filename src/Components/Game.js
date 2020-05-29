import React, {useState, useEffect, useRef} from 'react';
import Map from './Map/Map';
import './Map/Map.scss';
import axios from 'axios';

const Game = (props) => {
    const [map, setMap] = useState([])

    useEffect(() => {
        console.log("1")
        axios.get('/api/map').then(res => setMap(res.data)).catch(err => console.log(err))
    }, [])

    const mappedMap = map.map((e,i) => e.map((f,j) => {
        console.log(i, j, f.terrain)
    return <div className={i % 2 ? "hexagon" : "hexagon-odd"} style={{background: i % 2 === 0 && j === 8 ? 'black' : f.terrain === 'water' ? 'blue' : f.terrain === 'wheat' ? 'khaki' : f.terrain === 'sheep' ? 'green' : f.terrain === 'wood' ? 'darkgreen' : f.terrain === 'rock' ? 'grey' : f.terrain === 'clay' ? 'brown' : f.terrain === 'desert' ? 'tan' : 'blue'}}>{j}{i}</div>
    }))

    return (
        <div className="game-container">
            {mappedMap}
        </div>
    )
}

export default Game;