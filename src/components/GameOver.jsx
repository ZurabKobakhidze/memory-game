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
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [time]);

  const renderSinglePlayer = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="flex flex-col bg-white p-5 rounded-md shadow-lg tablet:w-[654px] tablet:pt-[51px] tablet:pl-[56px] tablet:pr-[56px] tablet:pb-[69px] tablet:box-border tablet:items-center tablet:rounded-[20px]">
        <h2 className="text-bodyColor font-atkinson font-700 text-[24px] tablet:text-[48px]">
          You did it!
        </h2>
        <h2 className="box-border  text-spanBlue font-atkinson font-700 text-[14px] pb-[24px] mt-[9px] tablet:text-[18px]">
          Game over! Here’s how you got on…
        </h2>
        <div className="box-border bg-playergray  mb-2 flex justify-between items-center flex-row w-full h-[48px] rounded-[5px] pl-[16px] pr-[16px] tablet:rounded-[10px] tablet:h-[72px] tablet:pl-[32px] tablet:pr-[32px] tablet:box-border tablet:mb-4">
          <p className="text-spanBlue  font-atkinson font-700 text-[13px] tablet:text-[18px]">
            Time Elapsed
          </p>
          <p className="text-timerColor font-atkinson font-700 text-[20px] tablet:text-[32px]">
            {formattedTime}
          </p>
        </div>

        <div className="box-border bg-playergray  mb-2 flex justify-between items-center flex-row w-full h-[48px] rounded-[5px] pl-[16px] pr-[16px] tablet:rounded-[10px] tablet:h-[72px] tablet:pl-[32px] tablet:pr-[32px] tablet:box-border tablet:mb-4">
          <p className=" text-spanBlue font-atkinson font-700 text-[13px] tablet:text-[18px]">
            Moves Taken
          </p>
          <p className="text-timerColor font-atkinson font-700 text-[20px] tablet:text-[32px]">
            {moves} Moves
          </p>
        </div>

        <div className="w-full flex flex-col items-center tablet:flex-row tablet:gap-[14px]">
          <button
            className="rounded-[26px] w-full h-[48px] bg-yellowButton mt-[16px] text-white font-atkinson font-700 text-[18px] tablet:h-[52px]  tablet:text-[20px] tablet:mt-[24px]"
            onClick={handleRestart}
          >
            Restart
          </button>
          <button
            className="rounded-[26px] w-full h-[48px] bg-playergray mt-[16px] text-timerColor font-atkinson font-700 text-[18px] tablet:h-[52px] tablet:text-[20px] tablet:mt-[24px]"
            onClick={handleClick}
          >
            Setup New Game
          </button>
        </div>
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
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 pl-[24px] pr-[24px]">
        <div className="box-border w-full flex flex-col bg-white items-center pt-[32px] pr-[24px] pl-[24px] pb-[24px] rounded-md shadow-lg tablet:w-[654px] tablet:pt-[51px] tablet:pl-[56px] tablet:pr-[56px] tablet:pb-[69px] tablet:box-border tablet:items-center tablet:rounded-[20px]">
          <h2 className="text-bodyColor font-atkinson font-700 text-[24px] tablet:text-[48px]">
            {winningPlayers.length === 1
              ? `Player ${winningPlayers[0]} Wins!`
              : "It's a Tie!"}
          </h2>
          <h2 className="text-spanBlue font-atkinson font-700 text-[14px] pb-[24px] mt-[9px] tablet:text-[18px] tablet:pb-[40px]">
            Game over! Here are the results…
          </h2>
          {Array.from({ length: players }, (_, i) => i + 1).map((player) => (
            <div
              key={player}
              className={`box-border mb-2 flex justify-between items-center flex-row w-full h-[48px] rounded-[5px] pl-[16px] pr-[16px] tablet:rounded-[10px] tablet:h-[72px] tablet:pl-[32px] tablet:pr-[32px] tablet:box-border tablet:mb-4 ${
                winningPlayers.includes(player)
                  ? "bg-bodyColor text-white "
                  : "bg-playergray text-spanBlue"
              }`}
            >
              <p className="  font-atkinson font-700 text-[13px] tablet:text-[18px]">
                Player {player}
                {winningPlayers.includes(player) && <span> (Winner!)</span>}
              </p>
              <p
                className={`text-timerColor font-atkinson font-700 text-[20px] tablet:text-[32px] ${
                  winningPlayers.includes(player) ? "text-white" : ""
                }`}
              >
                {scores[player - 1]} Pairs
              </p>
            </div>
          ))}
          <div className="w-full flex flex-col items-center tablet:flex-row tablet:gap-[14px]">
            <button
              className="rounded-[26px] w-full h-[48px] bg-yellowButton mt-[16px] text-white font-atkinson font-700 text-[18px] tablet:h-[52px]  tablet:text-[20px] tablet:mt-[24px]"
              onClick={handleRestart}
            >
              Restart
            </button>
            <button
              className="rounded-[26px] w-full h-[48px] bg-playergray mt-[16px] text-timerColor font-atkinson font-700 text-[18px] tablet:h-[52px] tablet:text-[20px] tablet:mt-[24px]"
              onClick={handleClick}
            >
              Setup New Game
            </button>
          </div>
        </div>
      </div>
    );
  };

  return <>{players === 1 ? renderSinglePlayer() : renderMultiplayer()}</>;
}

export default GameOver;
