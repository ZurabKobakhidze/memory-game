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
        className="bg-bodyColor min-h-screen flex flex-col items-center pt-20 pl-6 pr-6 box-border tablet:pt-[169px] tablet:pl-[57px] tablet:pr-[57px] tablet:pb-[169px] desktop:pt-[154px]"
      >
        <h1 className="font-bold text-2xl text-white tablet:text-3xl desktop:w-2xl">
          memory
        </h1>
        <div
          id="container"
          className="bg-white rounded-[10px] w-[327px] p-[24px] mt-[40px] flex flex-col items-center gap-6 tablet:w-[654px] tablet:p-[59px] desktop:w-[654px]"
        >
          <div id="select_theme_div" className="w-full">
            <h2 className="font-atkinson font-normal font-[700] text-[15px] leading-[19px] text-spanBlue tablet:text-[20px]">
              Select Theme
            </h2>
            <div
              id="theme_buttons"
              className="flex justify-around  mt-[11px] tablet:gap-[30px] tablet:flex tablet:flex-row tablet:mt-[16px]"
            >
              <button
                onClick={() => setTheme("Numbers")}
                id="button_numbers"
                className={` hover:bg-hoverColor w-[134px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor tablet:w-full tablet:h-[52px] tablet:text-[26px] ${
                  theme === "Numbers" ? "bg-bodyColor" : "bg-selectBlue"
                }`}
              >
                Numbers
              </button>
              <button
                onClick={() => setTheme("Icons")}
                id="button_icons"
                className={` hover:bg-hoverColor w-[134px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor tablet:w-full tablet:h-[52px] tablet:text-[26px] tablet:rounded-[26px] ${
                  theme === "Icons" ? "bg-bodyColor" : "bg-selectBlue"
                }`}
              >
                Icons
              </button>
            </div>
          </div>
          <div id="player_numbers_div" className="w-full">
            <h2
              className="font-atkinson font-normal font-[700] text-[15px] leading-[19px] text-spanBlue tablet:text-[20px]"
              id=""
            >
              Numbers of Players
            </h2>
            <div
              id="numbers_buttons"
              className="flex justify-around  mt-[11px] tablet:gap-[30px] tablet:flex tablet:flex-row tablet:mt-[16px]"
            >
              <button
                className={` hover:bg-hoverColor w-[62px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor tablet:w-full tablet:h-[52px] tablet:text-[26px] tablet:rounded-[26px] ${
                  players === 1 ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setPlayers(1)}
              >
                1
              </button>
              <button
                className={` hover:bg-hoverColor w-[62px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor tablet:w-full tablet:h-[52px] tablet:text-[26px] tablet:rounded-[26px] ${
                  players === 2 ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setPlayers(2)}
              >
                2
              </button>
              <button
                className={` hover:bg-hoverColor w-[62px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor tablet:w-full tablet:h-[52px] tablet:text-[26px] tablet:rounded-[26px] ${
                  players === 3 ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setPlayers(3)}
              >
                3
              </button>
              <button
                className={` hover:bg-hoverColor w-[62px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor tablet:w-full tablet:h-[52px] tablet:text-[26px] tablet:rounded-[26px] ${
                  players === 4 ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setPlayers(4)}
              >
                4
              </button>
            </div>
          </div>
          <div id="grid_size_div" className="w-full">
            <h2 className="font-atkinson font-normal font-[700] text-[15px] leading-[19px] text-spanBlue tablet:text-[20px]">
              Grid Size
            </h2>
            <div
              id="grid_buttons"
              className="flex justify-around  mt-[11px] tablet:gap-[30px] tablet:flex tablet:flex-row tablet:mt-[16px]"
            >
              <button
                className={` hover:bg-hoverColor w-[134px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor tablet:w-full tablet:h-[52px] tablet:text-[26px] tablet:rounded-[26px] ${
                  gridSize === "4x4" ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setGridSize("4x4")}
              >
                4x4
              </button>
              <button
                className={` hover:bg-hoverColor w-[134px] h-[40px] flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[16px] leading-[20px] text-logoColor tablet:w-full tablet:h-[52px] tablet:text-[26px] tablet:rounded-[26px] ${
                  gridSize === "6x6" ? "bg-bodyColor" : "bg-selectBlue"
                }`}
                onClick={() => setGridSize("6x6")}
              >
                6x6
              </button>
            </div>
          </div>
          <Link
            className=" hover:bg-hoverYellow mt-[8px] w-[279px] h-[48px] bg-yellowButton flex flex-row justify-center items-center rounded-[26px] font-atkinson font-normal font-[700] text-[18px] leading-[22px] text-logoColor tablet:w-full tablet:h-[70px] tablet:rounded-[35px] tablet:mt-[9px]"
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
