import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Homepage(props){

    const [playerName, setPlayerName] = useState('');
    
    let navigate = useNavigate();

    const goToGameRoom = () => {
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