import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux'
import Map from './Map/Map';
import './Map/Map.scss';
import './Game.scss';
import axios from 'axios';

const Game = (props) => {
    // const [map, setMap] = useState([])
    const {map} = useSelector(({gameReducer}) => gameReducer)

    // useEffect(() => {
    //     console.log("1")
    //     axios.get('/api/map').then(res => setMap(res.data)).catch(err => console.log(err))
    // }, [])

    const mappedMap = map.map((e,i) => e.map((f,j) => {
    return <div className={i % 2 ? "hexagon" : "hexagon-odd"} style={{background: i % 2 === 0 && j === 8 ? 'black' : f.terrain === 'water' ? 'blue' : f.terrain === 'wheat' ? 'khaki' : f.terrain === 'sheep' ? 'green' : f.terrain === 'wood' ? 'darkgreen' : f.terrain === 'rock' ? 'grey' : f.terrain === 'clay' ? 'brown' : f.terrain === 'desert' ? 'tan' : f.terrain === 'port' ? 'radial-gradient(blue, black)' : 'blue'}}>{f.number ? <div className="number-container">{f.number}</div> : null}</div>
        }))

    return (
        <div className="game-container">
            {mappedMap}
        </div>
    )
}

export default Game;