import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import iconLogo from "../assets/logo.svg";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faLock, faCog, faTrash, faSearch, faStar, faHeart, faCamera, faWifi } from "@fortawesome/free-solid-svg-icons";
import { faClock, faCalendar, faEnvelope, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faApple, faFacebook, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

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
  const { theme, gridSize } = location.state;
  const [players] = useState(location.state.players);
  

  const gridColumns = gridSize.split("x")[0];

  const generateArray = (size, theme) => {
    const num = size.split("x")[0];
    const squareNum = num * num;
    const halfSquareNum = squareNum / 2;

    let initialArray;

    if (theme === "Numbers") {
      initialArray = Array.from({ length: halfSquareNum }, (_, i) => ({
        id: i + 1,
        value: i + 1,
        isClicked: false
      }));
    } else if (theme === "Icons") {
      initialArray = Array.from({ length: halfSquareNum }, (_, i) => ({
        id: i + 1,
        value: iconsArray[i % iconsArray.length],
        isClicked: false
      }));
    }

    return [...initialArray, ...initialArray];
  };

  const gameArray = generateArray(gridSize, theme);
  const shuffledArray = gameArray.sort(() => 0.5 - Math.random());

  const [items, setItems] = useState(shuffledArray);

  const handleClick = (index) => {
    setItems(items.map((item, i) => i === index ? { ...item, isClicked: true } : item));
  };

  return (
    <div>
      <img src={iconLogo} alt="" />

      <div
        id="grid_container"
        style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
        className="grid items-center justify-items-center"
      >
        {items.map((item, index) => (
          <div
            key={index}
            id="circle"
            className={`rounded-full w-[47px] h-[47px] flex justify-center items-center ${item.isClicked ? 'bg-playergray ' : 'bg-bodyColor'}`}
            onClick={() => handleClick(index)}
          >
            {item.isClicked && (theme === "Numbers" ? (
              <p>{item.value}</p>
            ) : (
              <FontAwesomeIcon icon={item.value} />
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-6 justify-center">
        {Array.from({ length: players }, (_, i) => i + 1).map((player) => (
          <div
            key={player}
            id={`player ${player}`}
            className="w-full h-18 bg-playergray rounded-sm flex justify-center items-center flex-col"
          >
            <p>p{player}</p>
            <p>0</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamePage;
