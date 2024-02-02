import Homepage from "./components/Homepage";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameRoom from "./components/GameRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gameroom" element={<GameRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
