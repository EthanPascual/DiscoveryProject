import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import io from "socket.io-client";
import {socket} from "../App";



export default function GameRoom(props){

    const [gameList, setGamesList] = useState([]);
    const [message, setMessage] = useState('');
    const [chatLog, setChatlog] = useState([]);

    useEffect(()=>{ // This is used for populating the setGamesList

      axios.get('http://localhost:8000/games').then(res => {
        setGamesList(res.data)
        console.log(gameList)
      });
    }, [])

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


    return (
      <>
      <div>

        
      </div>
        <div className="gameContainer">
          <div className="guessesContainer">
            <div className="yourGuesses">
              <h2>Your guesses</h2>
              <ul>
                <li>
                  <p>HELLO 2</p>
                </li>
                <li>
                  <p>TEETH 0</p>
                </li>
                <li>
                  <p>HOUSE 0</p>
                </li>
              </ul>
            </div>
            <div className="enemyGuesses">
              <h2>Enemy guesses</h2>
              <ul>
                <li>
                  <p>HELLO 0</p>
                </li>
                <li>
                  <p>ALLAH 0</p>
                </li>
                <li>
                  <p>INUET 1</p>
                </li>
              </ul>
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
        </div>
        <div className = "chatRoom">
          <input type='text' onChange={handleInputChange}/>
                <button onClick={sendMessage}> Send Message to Server via Sockets</button>
                <ul>
                    {chatLog.map((message, index) => (
                    <li key={index}>{message}</li>
                    ))}
                </ul>
        </div>
      </>
      
    );
}
