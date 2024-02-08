import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import io from "socket.io-client";
import {socket} from "../App";
import GameEndModal from './GameEndModal';



export default function GameRoom(props){

    const [gameList, setGamesList] = useState([]);
    const [message, setMessage] = useState('');
    const [chatLog, setChatlog] = useState([]);
    const [gameEnd, setGameEnd] = useState(false);
    const [win, setWin] = useState(false);
    const [turn, setTurn] = useState(false);

    useEffect(()=>{ // This is used for populating the setGamesList

      axios.get('http://localhost:8000/games').then(res => {
        setGamesList(res.data)
        console.log(gameList)
      });

      socket.on('gameEnd', () => {
        console.log('You Lost :(')
        setGameEnd(true);
        console.log(gameEnd);
      });

      

  
    return () => {
        socket.off('gameEnd');
    }

    


    }, [])

    const handleKeyPress = (event) => {
      if(event.key == 'Enter'){
        console.log('sending message: ' + message);
        setChatlog([...chatLog, 'me: ' + message]);
        socket.emit('message', message.toString());
        setMessage('');
      }
    }

    const winning = () => {
      console.log('You Win!!');
      socket.emit('gameEnd');
      setWin(true)
      setGameEnd(true)
      console.log(gameEnd)
    }


  const handleInputChange = (e) => {
      setMessage(e.target.value);
  }

  socket.on('message', (message) => {
      setChatlog([...chatLog, 'player 2: ' + message]);
      console.log('📩: message received: ' + message);
  });



    return (
      <>
      {gameEnd && <GameEndModal win={win} />}
      <div className='container'>
        <div className="gameContainer">
          <div className="guessesContainer">
            <div className="yourGuesses">
              <h2>Your guesses</h2>
              
            </div>
            <div className="enemyGuesses">
              <h2>Enemy guesses</h2>
              
            </div>
          </div>
          <div className="inputArea">
            <label htmlFor="current-guess">input current guess:</label>
            <input
              type="text"
              id="current-guess"
              name="current-guess"
              maxLength="5"
            />
          </div>
          <div className="notesArea">
            <textarea placeholder="*text area for notes about the game*"></textarea>
          </div>
          <button onClick={winning}>Click to Simulate Win</button>
        </div>
        <div className = "chatRoom">
          <input type='text' id='chatInput' onKeyPress={handleKeyPress} onChange={handleInputChange} placeholder='Chat with your opponent...' value={message}/>
                <ul>
                    {chatLog.map((message, index) => (
                    <li key={index}>{message}</li>
                    ))}
                </ul>
        </div>
        </div>
      </>
      
    );
}
