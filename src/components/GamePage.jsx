import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faLock,
  faCog,
  faTrash,
  faSearch,
  faStar,
  faHeart,
  faCamera,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faCalendar,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {
  faApple,
  faFacebook,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faHome,
  faUser,
  faLock,
  faCog,
  faTrash,
  faSearch,
  faStar,
  faHeart,
  faCamera,
  faWifi,
  faClock,
  faCalendar,
  faEnvelope,
  faPaperPlane,
  faApple,
  faFacebook,
  faGoogle,
  faGithub
);

const iconsArray = [
  faHome,
  faUser,
  faLock,
  faCog,
  faTrash,
  faSearch,
  faStar,
  faHeart,
  faCamera,
  faWifi,
  faClock,
  faCalendar,
  faEnvelope,
  faPaperPlane,
  faApple,
  faFacebook,
  faGoogle,
  faGithub,
];

function GamePage() {
  const location = useLocation();
  const { theme, players, gridSize } = location.state;

  const generateArray = (size, theme) => {
    const num = size.split("x")[0];
    const squareNum = num * num;
    const halfSquareNum = squareNum / 2;

    let initialArray;

    if (theme === "Numbers") {
      initialArray = Array.from({ length: halfSquareNum }, (_, i) => ({
        id: i + 1,
        value: i + 1,
      }));
    } else if (theme === "Icons") {
      initialArray = Array.from({ length: halfSquareNum }, (_, i) => ({
        id: i + 1,
        value: iconsArray[i % iconsArray.length],
      }));
    }

    return [...initialArray, ...initialArray];
  };

  const gameArray = generateArray(gridSize, theme);
  const shuffledArray = gameArray.sort(() => 0.5 - Math.random());

  return (
    <div>
      <h1>Game Page</h1>
      <p>Theme: {theme}</p>
      <p>Number of Players: {players}</p>
      <p>Grid Size: {gridSize}</p>
      <div
        id="grid_container"
        className="grid grid-cols-4 items-center justify-items-center"
      >
        {shuffledArray.map((item, index) =>
          theme === "Numbers" ? (
            <p key={index}>{item.value}</p>
          ) : (
            <FontAwesomeIcon key={index} icon={item.value} />
          )
        )}
      </div>
    </div>
  );
}

export default GamePage;
