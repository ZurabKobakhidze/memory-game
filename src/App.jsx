import { useState } from "react";
import logo from "./assets/logo.svg";

function App() {
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
              <button id="button_numbers">Numbers</button>
              <button id="button_icons">Icons</button>
            </div>
          </div>
          <div id="player_numbers_div" className="w-full">
            <h2 id="">Numbers of Players</h2>
            <div id="numbers_buttons" className="flex justify-around flex-wrap">
              <button>1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
            </div>
          </div>
          <div id="grid_size_div" className="w-full">
            <h2>Grid Size</h2>
            <div id="grid_buttons" className="flex justify-around flex-wrap">
              <button>4x4</button>
              <button>6x6</button>
            </div>
          </div>
          <button>Start Game</button>
        </div>
      </div>
    </>
  );
}

export default App;
