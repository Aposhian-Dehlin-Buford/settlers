import React, {useState, useEffect, useRef} from 'react';
import Map from './Map/Map';
import './Map/Map.scss';
import './Game.scss';
import axios from 'axios';

const Game = (props) => {
    const [map, setMap] = useState([])

    useEffect(() => {
        axios.get('/api/map').then(res => setMap(res.data)).catch(err => console.log(err))
    }, [])

   

        

    return (
        <div className="game-container">
            <Map map={map} />
        </div>
    )
}

export default Game;