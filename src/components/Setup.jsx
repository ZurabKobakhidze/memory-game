import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";

function SetupPage() {
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState(null);
  const [gridSize, setGridSize] = useState("");
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {

    console.log("Theme: ", theme);
    console.log("Number of Players: ", players);
    console.log("Grid Size: ", gridSize);
  

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
          className="bg-white rounded-[10px] w-full p-[24px] mt-[40px] flex flex-col items-center gap-6"
        >
          <div id="select_theme_div" className="w-full">
            <h2 className="">Select Theme</h2>
            <div id="theme_buttons" className="flex justify-around flex-wrap">
              <button onClick={() => setTheme("Numbers")} id="button_numbers">
                Numbers
              </button>
              <button onClick={() => setTheme("Icons")} id="button_icons">
                Icons
              </button>
            </div>
          </div>
          <div id="player_numbers_div" className="w-full">
            <h2 id="">Numbers of Players</h2>
            <div id="numbers_buttons" className="flex justify-around flex-wrap">
              <button onClick={() => setPlayers(1)}>1</button>
              <button onClick={() => setPlayers(2)}>2</button>
              <button onClick={() => setPlayers(3)}>3</button>
              <button onClick={() => setPlayers(4)}>4</button>
            </div>
          </div>
          <div id="grid_size_div" className="w-full">
            <h2>Grid Size</h2>
            <div id="grid_buttons" className="flex justify-around flex-wrap">
              <button onClick={() => setGridSize("4x4")}>4x4</button>
              <button onClick={() => setGridSize("6x6")}>6x6</button>
            </div>
          </div>
          <Link
            to={
              allSelected
                ? { pathname: "/Game", state: { theme, players, gridSize } }
                : undefined
            }
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
