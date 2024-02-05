import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { set } from 'mongoose';
import io from "socket.io-client";
import {socket} from '../App';



export default function Homepage({user}){

    
    let navigate = useNavigate();

    const goToGameRoom = () => {
        socket.emit('findGame');
        navigate('/gameroom'); // Use the route path you defined in App.js
    };
    const goToStats = () => {
        navigate('/stats');
    }


    

    return(
        <>
            <div className="home-container">
                <h1>Welcome to the Wordle Game, {user}</h1>
                
                
                
            </div>
            <div className="home-buttons">
                <button onClick={goToGameRoom}>Start Game</button>
                <button onClick={goToStats}>Stats</button>
            </div>
        </>
    )
}