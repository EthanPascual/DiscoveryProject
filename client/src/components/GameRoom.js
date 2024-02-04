import React from 'react';

export default function GameRoom(props){

    return (
      <>
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
      </>
    );
}
