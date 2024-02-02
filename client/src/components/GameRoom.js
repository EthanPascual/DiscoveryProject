import React from 'react';
import styles from "./GameRoom.module.css";

export default function GameRoom(props){

    return (
      <>
        <div className={styles.gameContainer}>
          <div className={styles.guessesContainer}>
            <div className={styles.yourGuesses}>
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
            <div className={styles.enemyGuesses}>
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
          <div className={styles.inputArea}>
            <label htmlFor="current-guess">input current guess:</label>
            <input
              type="text"
              id="current-guess"
              name="current-guess"
              maxLength="5"
            />
          </div>
          <div className={styles.notesArea}>
            <textarea placeholder="*text area for notes about the game*"></textarea>
          </div>
        </div>
      </>
    );
}
