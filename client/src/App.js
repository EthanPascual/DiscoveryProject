import Homepage from "./components/Homepage";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameRoom from "./components/GameRoom";
import Stats from "./components/Stats"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gameroom" element={<GameRoom />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
