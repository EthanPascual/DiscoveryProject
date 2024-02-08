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
  const [yourGuessLog, setYourGuessLog] = useState([]);
  const [enemyGuessLog, setEnemyGuessLog] = useState([]);
  const [gameEnd, setGameEnd] = useState(false);
  const [win, setWin] = useState(false);
  const [guess, setGuess] = useState('');
  const [currentTurn, setCurrentTurn] = useState('');
  const [myPlayerId, setMyPlayerId] = useState('');
  //const [turn, setTurn] = useState(false);

  useEffect(()=>{ // This is used for populating the setGamesList
    setMyPlayerId(socket.id)

    axios.get('http://localhost:8000/games').then(res => {
      setGamesList(res.data)
      console.log(gameList)
    });

    socket.on('gameEnd', () => {
      console.log('You Lost :(')
      setGameEnd(true);
      console.log(gameEnd);
    });

    const messageListener = (message) => {
      setChatlog((chatLog) => [...chatLog, 'player 2: ' + message]);
      console.log('message received: ' + message);
    };

    socket.on('message', messageListener);

    const opponentGuessListener = (guess) => {
      console.log('Opponent guessed: ' + guess);
      setEnemyGuessLog((enemyGuessLog) => [...enemyGuessLog, guess]);
    };

    socket.on('opponentGuess', opponentGuessListener);

    const turnListener = (turn) => {
      console.log(`It's now ${turn}'s turn.`);
      setCurrentTurn(turn);
      /*if (turn === socket.id) {
        setTurn(true)
      } else {
        setTurn(false)
      }*/
    };

    socket.on('turn', turnListener);

    return () => {
        socket.off('gameEnd');
        socket.off('message', messageListener);
        socket.off('opponentGuess', opponentGuessListener);
        socket.off('turn', turnListener);
    }
  }, [])

  const handleKeyPressChat = (event) => {
    if(event.key == 'Enter'){
      console.log('sending message: ' + message);
      setChatlog([...chatLog, 'me: ' + message]);
      socket.emit('message', message.toString());
      setMessage('');
    }
  }

  const handleKeyPressGuess = (event) => {
    if (event.key == 'Enter') {

      console.log("your id",myPlayerId);
      tryGuessWord();
    }
  }

  const tryGuessWord = () => {
    console.log('guessing: ' + guess);
    setYourGuessLog([...yourGuessLog, guess]);
    socket.emit('guess', guess);
    setGuess('');
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

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
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
            <ul></ul>
          </div>
          <div className="enemyGuesses">
            <h2>Enemy guesses</h2>
            <ul></ul>
          </div>
        </div>
        <div className="inputArea">
          <p>{currentTurn === myPlayerId ? "Your" : "Enemy's"} turn</p>
          <label htmlFor="current-guess">input current guess:</label>
          <input
            type="text"
            id="current-guess"
            name="current-guess"
            maxLength="5"
            value={guess}
            onChange={handleGuessChange}
            onKeyDown={handleKeyPressGuess}
          />
          <button onClick={tryGuessWord}>Submit Guess</button>
        </div>
        <div className="notesArea">
          <textarea placeholder="*text area for notes about the game*"></textarea>
        </div>
        <button onClick={winning}>Click to Simulate Win</button>
      </div>
      <div className = "chatRoom">
        <input type='text' id='chatInput' onKeyDown={handleKeyPressChat} onChange={handleInputChange} placeholder='Chat with your opponent...' value={message}/>
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
