import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const player = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    //贏了就turn
    if (winner || squares[i]) return;
    // 回傳紀錄
    squares[i] = player;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jump = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `MOVE ${move}` : "Go to Start";
      return (

        <li key={move}>
          <button onClick={() => jump(move)}>{destination}</button>
        </li>
      );
     
    });

  return (
    <>
      <h1>Let's Play</h1>
        <h3>{winner ? "Winner: " + winner : "Next Player: " + player}</h3>
      <div className="info-wrapper">
        <div>
          <h4>STEPS</h4>
          {renderMoves()}
        </div>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      </div>
    </>
  );
};

export default Game;