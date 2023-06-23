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
  const {theme, gridSize } = location.state;
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

  const formattedTime = React.useMemo(() => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timer]);

  const circleSize =
    gridSize === "4x4"
      ? "72.5px"
      : gridSize === "6x6"
      ? "47px"
      : "default size";
  const gapSize =
    gridSize === "4x4" ? "12px" : gridSize === "6x6" ? "9px" : "default";

  return (
    <div className="p-[24px] box-border flex flex-col items-center">
      <div id="header" className="w-full flex justify-between items-center">
        <img className="w-[92px]" src={iconLogo} alt="" />
        <button
          className="w-[78px] h-[40px] rounded-full bg-yellowButton text-logoColor text-center text-[16px] font-atkinson font-700"
          onClick={() => setIsMenuOpen(true)}
        >
          Menu
        </button>
      </div>
      <div
        id="grid_container"
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: gapSize,
        }}
        className="mt-[80px] grid items-center justify-center h-[327px] w-[327px]"
      >
        {items.map((item, index) => (
          <div
            key={index}
            id="circle"
            className={`rounded-full flex justify-center items-center ${
              item.isClicked || item.isMatch ? "bg-selectBlue" : "bg-bodyColor"
            } ${item.isMatch ? "bg-yellowButton" : ""}`}
            style={{ width: circleSize, height: circleSize }}
            onClick={() => handleClick(index)}
          >
            {(item.isClicked || item.isMatch) &&
              (theme === "Numbers" ? (
                <p className="text-white text-center text-[25px] font-bold font-atkinson">
                  {item.value}
                </p>
              ) : (
                <FontAwesomeIcon
                  icon={item.value}
                  className="text-white text-[25px]"
                />
              ))}
          </div>
        ))}
      </div>

      {players > 1 && (
        <div className="relative flex gap-[25px] justify-center mt-[102px] w-full">
          {Array.from({ length: players }, (_, i) => i + 1).map((player) => (
            <div
              key={player}
              id={`player ${player}`}
              className={`w-full h-[70px] bg-playergray rounded-[5px] flex  items-center flex-col ${
                player - 1 === currentPlayer
                  ? "bg-yellowButton"
                  : "bg-playergray"
              }`}
            >
              {player - 1 === currentPlayer && (
                <div id="triangle" className="absolute top-[-60px]  w-0 h-0 border-transparent border-[20px] border-solid border-t-[50px] border-l-[20px] border-r-[20px] border-b-yellowButton"></div>
              )}
              <p
                className={`text-[15px] font-700 font-atkinson mt-[10px] ${
                  player - 1 === currentPlayer ? "text-white" : "text-spanBlue"
                }`}
              >
                P{player}
              </p>
              <p
                className={`text-[24px] font-700 font-atkinson ${
                  player - 1 === currentPlayer
                    ? "text-white"
                    : "text-timerColor"
                }`}
              >
                {scores[player - 1]}
              </p>
            </div>
          ))}
        </div>
      )}
      {players === 1 && (
        <div className="flex gap-[25px] justify-center mt-[102px] w-full">
          <div className="w-full h-[70px] bg-playergray rounded-[5px] flex  items-center flex-col">
            <p className="text-spanBlue text-[15px] font-700 font-atkinson mt-[10px]">
              Timer
            </p>
            <p className="text-timerColor text-[24px] font-700 font-atkinson">
              {formattedTime}
            </p>
          </div>
          <div className="w-full h-[70px] bg-playergray rounded-[5px] flex  items-center flex-col">
            <p className="text-spanBlue text-[15px] font-700 font-atkinson mt-[10px]">
              Moves
            </p>
            <p className="text-timerColor text-[24px] font-700 font-atkinson">
              {moves}
            </p>
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
      {isMenuOpen && <MenuHamburger closeMenu={() => setIsMenuOpen(false)} />}
    </div>
  );
}

export default GamePage;
