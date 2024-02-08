import { useNavigate } from 'react-router-dom';
import {socket} from '../App'
import {useState} from 'react';


export default function ChooseWordModal({words}){
    let navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [validWord, setValidWord] = useState(true);
    const handleInputChange = (e) => {
        setMessage(e.target.value);
    }
    const handleKeyPress = (event) => {
        if(event.key == 'Enter'){
            checkWord(message);
        }
    }
    const checkWord = (word) => {
        let set = []
        if(word.length != 5){
            setValidWord(false);
            setMessage('');
        } else {
            for(let i = 0; i < 5; i++){
                let currentChar = word.charAt(i);
                if(set.indexOf(currentChar) !== -1){
                    console.log('Duplicate Letters');
                    setValidWord(false);
                    setMessage('');
                    return;
                } else {
                    set.push(currentChar);
                }
            }
            if(words.indexOf(word) !== -1){
                socket.emit('createdWord', word);
                setMessage('');
            } else {
                console.log('word not in word list');
                setValidWord(false);
                setMessage('');
            }
            
        }
    }



    return (
        <div className="gameEndModal">
           <h1>Please choose your word:</h1>
           {validWord ? <></> : <p>Your word is not valid. Please make it a 5 unique letters and a valid word.</p>}
           <input type='text'  onKeyPress={handleKeyPress} onChange={handleInputChange} value={message}/>
        </div>
    );
}