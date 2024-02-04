import Homepage from "./components/Homepage";
import React, { useEffect, useState } from 'react';
import './stylesheets/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameRoom from "./components/GameRoom";
import Stats from "./components/Stats"
import { CookiesProvider, useCookies} from 'react-cookie';
import axios from "axios";



function App() {

  const [wordList, setWordsList] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    const setCookieIfNewUser = async () => {
      if (!cookies.user) {
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

          let randomName = getRandomName();
          setCookie("user", randomName, { path: "/" });

          await axios.post('http://localhost:8000/newUsers', {
            UserName: randomName
          });
        } catch (error) {
          console.error('Error setting cookie:', error);
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage user={user}/> } />
        <Route path="/gameroom" element={<GameRoom />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
