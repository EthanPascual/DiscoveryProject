import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [chosenWord, setChosenWord] = useState('');
  const [currentTurn, setCurrentTurn] = useState('');

  return (
    <GameContext.Provider value={{ chosenWord, setChosenWord, currentTurn, setCurrentTurn }}>
      {children}
    </GameContext.Provider>
  );
};
