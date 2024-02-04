import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { set } from 'mongoose';
import io from "socket.io-client";



export default function Homepage(props){

    
    let navigate = useNavigate();

    const goToGameRoom = () => {
        const socket = io();
        navigate('/gameroom'); // Use the route path you defined in App.js
    };
    const goToStats = () => {
        navigate('/stats');
    }


    

    return(
        <>
            <div class="home-container">
                <h1>Welcome to the Wordle Game</h1>
                <button onClick={goToGameRoom}>Start Game</button>
                <button onClick={goToStats}>Stats</button>
                
                
            </div>
        </>
    )
}