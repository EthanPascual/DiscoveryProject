import Homepage from "./components/Homepage";
import React, { useEffect, useState } from 'react';
import './stylesheets/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameRoom from "./components/GameRoom";
import Stats from "./components/Stats"
import { CookiesProvider, useCookies} from 'react-cookie';
import axios from "axios";
import { io } from 'socket.io-client';
import { GameProvider } from './components/GameContext'
export const socket = io('http://localhost:8000');

function App() {

  const [wordList, setWordsList] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  const [userList, setUserList] = useState([]);
  

  useEffect(() => {

    axios.get('http://localhost:8000/users').then(res => {
      
      setUserList(res.data);

    });
  }, []);

  useEffect(() => {
    const setCookieIfNewUser = async () => {
        try {
          if (wordList.length === 0) {
            const response = await fetch('/words.json');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            const wordList = jsonData.list;
            setWordsList(wordList);
          }
          }  catch (error) {
            console.error('Error setting cookie:', error);
          }
          if(!cookies.user){
            if (wordList.length > 0) { 
              let uniqueName = false;
              let randomName;
  
              while(!uniqueName){
                randomName = getRandomName();
                if(userList.includes(randomName)){
  
                }
                else{
                  uniqueName = true;
                }
              }
              
              setCookie("user", randomName, { path: "/" });
    
              await axios.post('http://localhost:8000/newUsers', {
                UserName: randomName
              });
            }
        
          }
          
      
    };

    setCookieIfNewUser();
  }, [cookies.user, wordList, setCookie]);

  const getRandomName = () => {
    let length = wordList.length;
    let randomName = wordList[Math.floor(Math.random() * length)] + wordList[Math.floor(Math.random() * length)];
    return randomName;
  }

  let user = cookies.user;
  console.log(user);
  console.log(userList);



  return user ? (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage user={user} words={wordList}/> } />
          <Route path="/gameroom" element={<GameRoom />} />
          <Route path="/stats" element={<Stats user={user} />} />
        </Routes>
      </Router>
    </GameProvider>
  ) : (
      <div>Loading...</div>
  );
}

export default App;
