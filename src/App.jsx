import { useState } from "react";
import logo from "./assets/logo.svg";


function App() {
  return (
    <>
      <div id="body_div" className="bg-bodyColor min-h-screen flex flex-col items-center pt-20 pl-6 pr-6 box-border">
      <h1 className="font-bold text-2xl text-white">memory</h1>
      <div id="container" className="bg-white rounded-[10px] w-full p-[24px] mt-[40px]"></div>
      </div>
    </>
  );
}

export default App;
