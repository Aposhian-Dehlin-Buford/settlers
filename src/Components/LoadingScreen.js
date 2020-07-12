import React, { useEffect, useRef } from 'react'
import {TweenMax} from 'gsap'
import './LoadingScreen.scss'

const LoadingScreen = () => {
    let animate = useRef(null)

    let res = ["wheat", "sheep", "rock", "wood", "clay"]

    


    return (
        <div className="loading-screen-container">
            <div className="loading" ref={el => {animate = el}}></div>
        
        </div>
    )
}

export default LoadingScreen;