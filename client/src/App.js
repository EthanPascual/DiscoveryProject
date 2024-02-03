import Homepage from "./components/Homepage";
import React, { useEffect } from 'react';
import './stylesheets/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameRoom from "./components/GameRoom";
import Stats from "./components/Stats"
import { CookiesProvider, useCookies} from 'react-cookie';
import axios from "axios";



function App() {

  const [wordList, setWordsList] = useState([]);

  const getRandomName = async () => {
    try {
      if(wordList.length === 0){
        const response = await fetch('/words.json');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();
        const wordsList = jsonData.list;
        console.log(wordsList);
        setWordsList(wordList);
        
      }

      
      
      let length = wordsList.length;
      let randomName = wordsList[Math.floor(Math.random() * length)] + wordsList[Math.floor(Math.random() * length)];
      return randomName;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  const setCookieIfNewUser = async () => {
    if (!cookies.user) {
        try {
            let randomName = await getRandomName();
            console.log(randomName);

            //REMEMBER TO ADD THIS NAME TO OUR DATABASE, AS WELL AS MAKING SURE IT ISNT ALREADY USED



            setCookie("user", randomName, { path: "/" });

            await axios.post('http://localhost:8000/newUsers',{
              UserName: randomName
            });


        } catch (error) {
            console.error('Error setting cookie:', error);
        }
    }
};

const [cookies, setCookie] = useCookies(["user"]);
setCookieIfNewUser();
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
