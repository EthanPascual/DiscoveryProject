import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { set } from 'mongoose';
import io from "socket.io-client";
import {socket} from '../App';
import WaitingRoom from "./WaitingRoom.js"



export default function Homepage({user}){

    
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const goToGameRoom = () => {
        setShowModal(true)
        socket.emit('findGame');
        
    };
    const goToStats = () => {
        navigate('/stats');
    }

    useEffect(() => {
        socket.on('message', (message) => {
            if (message === 'Game Start') {
                console.log('Game started!'); 
                setShowModal(false);
                navigate('/gameroom');
            }
        });

        return () => {
            socket.off('Game Start');
        };
    }, []);


    

    return(
        <>

            {showModal && <WaitingRoom />}
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