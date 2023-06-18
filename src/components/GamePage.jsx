import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function GamePage() {
  const location = useLocation();
  const { theme, players, gridSize } = location.state;

  const generateArray = (size) => {
    const num = size.split("x")[0];
    const squareNum = num * num;
    const halfSquareNum = squareNum / 2;
    const initialArray = Array.from({length: halfSquareNum}, (_, i) => i + 1);
    return [...initialArray, ...initialArray];
  };

  const numbersArray = generateArray(gridSize);
  const shuffledArray = numbersArray.sort(() => 0.5 - Math.random()); 

  useEffect(() => {
    console.log("Shuffled array: ", shuffledArray);
  }, []); 

  return (
    <div>
      <h1>Game Page</h1>
      <p>Theme: {theme}</p>
      <p>Number of Players: {players}</p>
      <p>Grid Size: {gridSize}</p>
      <div id="grid_container" className="grid grid-cols-4 items-center justify-items-center">
        {shuffledArray.map((number, index) => (
          <p key={index}>{number}</p>
        ))}
      </div>
    </div>
  );
}

export default GamePage;