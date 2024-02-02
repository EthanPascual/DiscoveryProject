import React from 'react'

export default function GameRoom(props){

    return(
        <>
            <div class="game-container">
                <div class="guesses-container">
                    <div class="your-guesses">
                        <h2>your guesses</h2>
                        <p>HELLO 2</p>
                        <p>TEETH 0</p>
                        <p>HOUSE 0</p>
                    </div>
                    <div class="enemy-guesses">
                        <h2>enemy guesses</h2>
                        <p>HELLO 0</p>
                        <p>ALLAH 0</p>
                        <p>INUET 1</p>
                    </div>
                </div>
                <div class="input-area">
                    <label for="current-guess">input current guess:</label>
                    <input type="text" id="current-guess" name="current-guess" maxlength="5"></input>
                </div>
                <div class="notes-area">
                    <textarea placeholder="*text area for notes about the game*"></textarea>
                </div>
            </div>
        </>
    )
}
