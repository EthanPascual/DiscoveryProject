import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { set } from 'mongoose';
import io from "socket.io-client";
import {socket} from '../App';
import WaitingRoom from "./WaitingRoom.js"
import Countdown from './Countdown.js'
import ChooseWordModal from './ChooseWordModal.js'


export default function Homepage({user}){

    
    let navigate = useNavigate();
    const [chooseWord, setChooseWord] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [gameFound, setGameFound] = useState(false);
    const [chosenWord, setChosenWord] = useState('');

    const goToGameRoom = () => {
        setShowModal(true)
        console.log("showing modal")
        socket.emit('findGame');
        
    };
    const goToStats = () => {
        navigate('/stats');
    }

    const pickWord = () => {
        setChooseWord(true);
        console.log("picking word")
    }

    useEffect(() => {
        socket.on('createdMessage', (word) => {
            console.log("word was found");
            setChosenWord(word);
            setChooseWord(false);
            goToGameRoom();
        });
        socket.on('message', (message) => {
            if (message === 'Game Start') {
                console.log('Game started!'); 
                setShowModal(false);
                setGameFound(true);
                setTimeout(() => {
                    navigate('/gameroom');
                }, 5000); // 5 seconds timeout
                
            }
        });

        return () => {
            socket.off('createdMessage');
            socket.off('Game Start');
        };

    }, []);


    

    return(
        <>
            {chooseWord && <ChooseWordModal />}
            {showModal && <WaitingRoom />}
            {gameFound && <Countdown />}
            <div className="home-container">
                <h1>Welcome to the Wordle Game, {user}</h1>
                
                
                
            </div>
            <div className="home-buttons">
                <button onClick={pickWord}>Start Game</button>
                <button onClick={goToStats}>Stats</button>
            </div>
        </>
    )
}