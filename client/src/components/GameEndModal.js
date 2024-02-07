import { useNavigate } from 'react-router-dom';
export default function GameEndModal({win}){
    let navigate = useNavigate();
    const returnHome = () => {
        navigate('/');
    }

    return (
        <div className="gameEndModal">
           {win ? <><h1>You Win!</h1> <p>You guessed your opponents word!</p></> : <><h1>You Lose!</h1> <p>Your opponent guessed your word!</p></>}
            <button onClick={returnHome}>Return Home</button>
        </div>
    );
}