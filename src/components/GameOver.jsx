import React from "react";
import { useNavigate } from "react-router-dom";

function GameOver({ players, scores, moves, time }) {
  const handleRestart = () => {
    window.location.reload();
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

 
  const formattedTime = React.useMemo(() => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [time]);

  const renderSinglePlayer = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="flex flex-col bg-white p-5 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold">You did it!</h2>
        <h2>Game over! Here’s how you got on…</h2>
        <p>Time Elapsed {formattedTime}</p> 
        <p>Moves Taken {moves} Moves</p>
        <button onClick={handleRestart}>Restart</button>
        <button onClick={handleClick}>Setup New Game</button>
      </div>
    </div>
  );

  const renderMultiplayer = () => {
    const maxScore = Math.max(...scores);
    const winningPlayers = scores.reduce(
      (winners, score, index) =>
        score === maxScore ? [...winners, index + 1] : winners,
      []
    );
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="flex flex-col bg-white p-5 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold">
            {winningPlayers.length === 1
              ? `Player ${winningPlayers[0]} Wins!`
              : "It's a Tie!"}
          </h2>
          <h2>Game over! Here are the results…</h2>
          {Array.from({ length: players }, (_, i) => i + 1).map((player) => (
            <div key={player} className="mb-2">
              <p>
                Player {player} {winningPlayers.includes(player) && <span> (Winner!)</span>} Score:{" "}
                {scores[player - 1]}
                
              </p>
            </div>
          ))}
          <button onClick={handleRestart}>Restart</button>
          <button onClick={handleClick}>Setup New Game</button>
        </div>
      </div>
    );
  };

  return <>{players === 1 ? renderSinglePlayer() : renderMultiplayer()}</>;
}

export default GameOver;
