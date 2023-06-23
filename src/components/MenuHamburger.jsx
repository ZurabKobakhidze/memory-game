import React from "react";
import { useNavigate } from "react-router-dom";

function MenuHamburger({ closeMenu, setIsTimerRunning }) {
  const handleRestart = () => {
    window.location.reload();
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const handleResumeGame = () => {
    setIsTimerRunning(true);
    closeMenu();
  };

  return (
    <div
      id="container"
      className="fixed inset-0 flex pt-[222px] justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="flex flex-col h-[224px] w-[324px] bg-logoColor p-[24px] rounded-md shadow-lg gap-[16px]">
        <button
          className="h-[48px] flex-shrink-0 rounded-[24px] bg-yellowButton text-white text-center text-[18px] font-atkinson font-700"
          onClick={handleRestart}
        >
          Restart
        </button>
        <button
          className="h-[48px] flex-shrink-0 rounded-[24px] bg-playergray text-bodyColor text-center text-[18px] font-atkinson font-700"
          onClick={handleClick}
        >
          New Game
        </button>
        <button
          className="h-[48px] flex-shrink-0 rounded-[24px] bg-playergray text-bodyColor text-center text-[18px] font-atkinson font-700"
          onClick={handleResumeGame}
        >
          Resume Game
        </button>
      </div>
    </div>
  );
}

export default MenuHamburger;
