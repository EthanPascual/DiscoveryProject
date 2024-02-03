import Homepage from "./components/Homepage";
import React, { useEffect } from 'react';
import './stylesheets/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameRoom from "./components/GameRoom";
import Stats from "./components/Stats"
import { CookiesProvider, useCookies} from 'react-cookie';



function App() {
  const getRandomName = async () => {
    try {
      const response = await fetch('/words.json');
      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      const wordsList = jsonData.list;
      console.log(wordsList);
      
      let length = wordsList.length;
      let randomName = wordsList[Math.floor(Math.random() * length)] + wordsList[Math.floor(Math.random() * length)];
      return randomName;
    } catch (error) {
      console.error('Error:', error);
      // You might want to handle the error here or rethrow it depending on your needs
      throw error;
    }
  }
  const setCookieIfNewUser = async () => {
    if (!cookies.user) {
        try {
            let randomName = await getRandomName();
            console.log(randomName);
            setCookie("user", randomName, { path: "/" });
        } catch (error) {
            console.error('Error setting cookie:', error);
        }
    }
};

const [cookies, setCookie] = useCookies(["user"]);
setCookieIfNewUser();
let user = cookies.user;

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
