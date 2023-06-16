import React from "react";
import { useLocation } from "react-router-dom";

function GamePage() {
  const location = useLocation();
  console.log(location);
  const { theme, players, gridSize } = location.state;




  return (
    <div>
      <h1>Game Page</h1>
      <p>Theme: {theme}</p>
      <p>Number of Players: {players}</p>
      <p>Grid Size: {gridSize}</p>
  
    </div>
  );
}

export default GamePage;