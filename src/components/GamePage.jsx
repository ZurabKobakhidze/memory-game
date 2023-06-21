import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import iconLogo from "../assets/logo.svg";
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
  const { theme, gridSize } = location.state;
  const [players] = useState(location.state.players);

  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [flipBack, setFlipBack] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0); 

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
        isClicked: false,
        isMatch: false,
      }));
    } else if (theme === "Icons") {
      initialArray = Array.from({ length: halfSquareNum }, (_, i) => ({
        id: i + 1,
        value: iconsArray[i % iconsArray.length],
        isClicked: false,
        isMatch: false,
      }));
    }

    return [...initialArray, ...initialArray];
  };

  const gameArray = generateArray(gridSize, theme);
  const shuffledArray = gameArray.sort(() => 0.5 - Math.random());

  const [items, setItems] = useState(shuffledArray);

  const handleClick = (index) => {
    if (
      flippedIndexes.includes(index) ||
      items[index].isMatch ||
      flippedCount === 2
    )
      return;

    const newItems = items.map((item, i) =>
      i === index ? { ...item, isClicked: true } : item
    );
    setItems(newItems);

    if (flippedCount === 0) {
      setFlippedIndexes([index]);
      setFlippedCount(flippedCount + 1);
    } else if (flippedCount === 1) {
      setFlippedIndexes((prev) => [...prev, index]);
      setFlippedCount(flippedCount + 1);
    }
  };

  useEffect(() => {
    if (flippedCount === 2) {
      const [index1, index2] = flippedIndexes;
      if (items[index1].id !== items[index2].id) {
        setTimeout(() => {
          setItems((prev) =>
            prev.map((item, i) =>
              i === index1 || i === index2
                ? { ...item, isClicked: false }
                : item
            )
          );
          setFlippedIndexes([]);
          setFlippedCount(0);
          setCurrentPlayer((currentPlayer + 1) % players);
        }, 1000);
      } else {
        setItems((prev) =>
          prev.map((item, i) =>
            i === index1 || i === index2 ? { ...item, isMatch: true } : item
          )
        );
        setFlippedIndexes([]);
        setFlippedCount(0);
      }
    }
  }, [flippedCount]);

  console.log(currentPlayer);

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
            className={`rounded-full w-[47px] h-[47px] flex justify-center items-center 
              ${
                item.isClicked || item.isMatch
                  ? "bg-playergray "
                  : "bg-bodyColor"
              }
              ${item.isMatch ? "bg-yellowButton" : ""}`}
            onClick={() => handleClick(index)}
          >
            {(item.isClicked || item.isMatch) &&
              (theme === "Numbers" ? (
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
          className={`w-full h-18 rounded-sm flex justify-center items-center flex-col ${player - 1 === currentPlayer ? 'bg-yellow-500' : 'bg-playergray'}`}
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
