import React from "react";

function GameOver() {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold">Game Over</h2>
        </div>
      </div>
    );
  }
  
  export default GameOver;
  