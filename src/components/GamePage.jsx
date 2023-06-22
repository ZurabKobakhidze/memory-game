import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import iconLogo from "../assets/logo.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuHamburger from "./MenuHamburger";
import GameOver from "./GameOver";
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
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState(Array(players).fill(0));
  const [timer, setTimer] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    if (flippedCount === 1) {
      setMoves(moves + 1);
    }

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

        setScores((prev) => {
          const newScores = [...prev];
          newScores[currentPlayer] += 1;
          return newScores;
        });
      }
    }
  }, [flippedCount]);

  const isGameOver = items.every((item) => item.isMatch);
  const [gameOver, setGameOver] = useState(isGameOver);

  useEffect(() => {
    setGameOver(items.every((item) => item.isMatch));
  }, [items]);

  useEffect(() => {
    let interval;
    if (players === 1 && !gameOver) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [players, gameOver]);

  // Format the timer value as mm:ss
  const formattedTime = React.useMemo(() => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timer]);

  return (
    <div>
      <div id="header" className="flex justify-between items-center">
        <img src={iconLogo} alt="" />
        <button
          className="w-[78px] h-[40px] rounded-full bg-yellowButton text-logoColor text-center text-[16px] font-atkinson font-700"
          onClick={() => setIsMenuOpen(true)}
        >
          Menu
        </button>
      </div>
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

      {players > 1 && (
        <div className="flex gap-6 justify-center">
          {Array.from({ length: players }, (_, i) => i + 1).map((player) => (
            <div
              key={player}
              id={`player ${player}`}
              className={`w-full h-18 rounded-sm flex justify-center items-center flex-col ${
                player - 1 === currentPlayer
                  ? "bg-yellowButton"
                  : "bg-playergray"
              }`}
            >
              <p>p{player}</p>
              <p>{scores[player - 1]}</p>
            </div>
          ))}
        </div>
      )}
      {players === 1 && (
        <div className="flex gap-6 justify-center">
          <div className="w-full h-18 rounded-sm flex justify-center items-center flex-col">
            <p>Moves</p>
            <p>{moves}</p>
          </div>
          <div className="w-full h-18 rounded-sm flex justify-center items-center flex-col">
            <p>Timer</p>
            <p>{formattedTime}</p>
          </div>
        </div>
      )}
      {isGameOver && (
        <GameOver
          players={players}
          scores={scores}
          moves={moves}
          time={timer}
        />
      )}
      {isMenuOpen && (
        <MenuHamburger closeMenu={() => setIsMenuOpen(false)} />
      )}
    </div>
  );
}

export default GamePage;
