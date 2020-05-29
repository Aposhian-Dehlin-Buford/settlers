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

   

        

    return (
        <div className="game-container">
            <Map map={map} />
        </div>
    )
}

export default Game;