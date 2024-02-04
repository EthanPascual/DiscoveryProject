import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { socket } from '../App';
import { set } from 'mongoose';


export default function Homepage(props){

    const [playerName, setPlayerName] = useState('');
    const [message, setMessage] = useState('');
    const [chatLog, setChatlog] = useState([]);
    
    let navigate = useNavigate();

    const goToGameRoom = () => {
        navigate('/gameroom'); // Use the route path you defined in App.js
    };
    const goToStats = () => {
        navigate('/stats');
    }


    
    const sendMessage = () => {
        console.log('sending message: ' + message);
        setChatlog([...chatLog, 'me: ' + message]);
        socket.emit('message', message.toString());
    }
    
    const handleInputChange = (e) => {
        setMessage(e.target.value);
    }

    socket.on('message', (message) => {
        setChatlog([...chatLog, 'player 2: ' + message]);
        console.log('📩: message received: ' + message);
    });

    return(
        <>
            <div class="home-container">
                <h1>Welcome to the Wordle Game</h1>
                <button onClick={goToGameRoom}>Start Game</button>
                <button onClick={goToStats}>Stats</button>
                <input type='text' onChange={handleInputChange}/>
                <button onClick={sendMessage}> Send Message to Server via Sockets</button>
                <ul>
                    {chatLog.map((message, index) => (
                    <li key={index}>{message}</li>
                    ))}
                </ul>
                
            </div>
        </>
    )
}