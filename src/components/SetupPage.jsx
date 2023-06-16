import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SetupPage() {
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState(null);
  const [gridSize, setGridSize] = useState("");
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    

    if (theme !== "" && players !== null && gridSize !== "") {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [theme, players, gridSize]);

  return (
    <>
      <div
        id="body_div"
        className="bg-bodyColor min-h-screen flex flex-col items-center pt-20 pl-6 pr-6 box-border"
      >
        <h1 className="font-bold text-2xl text-white">memory</h1>
        <div
          id="container"
          className="bg-white rounded-[10px] w-[327px] p-[24px] mt-[40px] flex flex-col items-center gap-6"
        >
          <div id="select_theme_div" className="w-full">
            <h2 className="font-atkinson font-normal font-[700] text-[15px] leading-[19px] text-spanBlue">
              Select Theme
            </h2>
            <div
              id="theme_buttons"
              className="flex justify-around flex-wrap mt-[11px]"
            >
              <button
                onClick={() => setTheme("Numbers")}
                id="button_numbers"
                className={`w-[134px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor ${
                  theme === "Numbers" ? "bg-bodyColor" : "bg-selectBlue"
                }`}
              >
                Numbers
              </button>
              <button
                onClick={() => setTheme("Icons")}
                id="button_icons"
                className={`w-[134px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor ${
                  theme === "Icons" ? "bg-bodyColor" : "bg-selectBlue"
                }`}
              >
                Icons
              </button>
            </div>
          </div>
          <div id="player_numbers_div" className="w-full">
            <h2
              className="font-atkinson font-normal font-[700] text-[15px] leading-[19px] text-spanBlue"
              id=""
            >
              Numbers of Players
            </h2>
            <div
              id="numbers_buttons"
              className="flex justify-around flex-wrap mt-[11px]"
            >
              <button
                className={`w-[62px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor ${
                  players === 1 ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setPlayers(1)}
              >
                1
              </button>
              <button
                className={`w-[62px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor ${
                  players === 2 ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setPlayers(2)}
              >
                2
              </button>
              <button
                className={`w-[62px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor ${
                  players === 3 ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setPlayers(3)}
              >
                3
              </button>
              <button
                className={`w-[62px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor ${
                  players === 4 ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setPlayers(4)}
              >
                4
              </button>
            </div>
          </div>
          <div id="grid_size_div" className="w-full">
            <h2 className="font-atkinson font-normal font-[700] text-[15px] leading-[19px] text-spanBlue">
              Grid Size
            </h2>
            <div
              id="grid_buttons"
              className="flex justify-around flex-wrap mt-[11px]"
            >
              <button
                className={`w-[134px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor ${
                  gridSize === "4x4" ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setGridSize("4x4")}
              >
                4x4
              </button>
              <button
                className={`w-[134px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor ${
                  gridSize === "6x6" ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setGridSize("6x6")}
              >
                6x6
              </button>
            </div>
          </div>
          <Link
            className="mt-[8px] w-[279px] h-[48px] bg-yellowButton flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[18px] leading-[22px] text-logoColor"
            state={{ theme, players, gridSize }}
            to={allSelected ? { pathname: "/gamePage" } : undefined}
            onClick={(e) => {
              if (!allSelected) {
                e.preventDefault();
              }
            }}
          >
            Start Game
          </Link>
        </div>
      </div>
    </>
  );
}

export default SetupPage;
