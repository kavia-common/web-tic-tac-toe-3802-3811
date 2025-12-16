import React, { useState } from "react";
import Board from "./Board";

// Calculate winner logic
function calculateWinner(squares) {
  /** Returns winning line indices and winner, or null if no win. */
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  for (const line of lines) {
    const [a,b,c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
      return { winner: squares[a], line };
  }
  return null;
}

// PUBLIC_INTERFACE
export default function Game() {
  /** Main Game component: manages game, board, move history, status, and controls. */
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[step];
  const result = calculateWinner(current);
  const draw = !result && current.every(Boolean);

  const status = result
    ? `Winner: ${result.winner} 🎉`
    : draw
      ? "Game Drawn 🤝"
      : `Next turn: ${xIsNext ? "X" : "O"}`;

  // PUBLIC_INTERFACE
  const handleClick = (i) => {
    if (result || current[i]) return;
    const next = current.slice();
    next[i] = xIsNext ? "X" : "O";
    const nextHistory = history.slice(0, step + 1).concat([next]);
    setHistory(nextHistory);
    setStep(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  const jumpTo = (move) => {
    setStep(move);
    setXIsNext(move % 2 === 0);
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    setHistory([Array(9).fill(null)]);
    setStep(0);
    setXIsNext(true);
  };

  return (
    <div className="ttt-game-container">
      <h1 className="ttt-title" aria-label="Tic Tac Toe Game">Tic Tac Toe</h1>
      <Board squares={current} onSquareClick={handleClick} winningLine={result && result.line} />
      <div className="ttt-controls">
        <div className={`ttt-status${result ? " win" : draw ? " draw" : ""}`} aria-live="polite">{status}</div>
        <button
          className="ttt-reset-btn"
          onClick={handleReset}
          aria-label="Restart the game"
          tabIndex="0"
          type="button"
        >🔄 Reset</button>
      </div>
      <details className="ttt-history-summary">
        <summary>Move history</summary>
        <ol className="ttt-history-list">
          {history.map((squares, move) => (
            <li key={move}>
              <button
                onClick={() => jumpTo(move)}
                className={`ttt-move-btn${move === step ? " ttt-current" : ""}`}
                aria-label={move === 0 ? "Go to start" : `Go to move #${move}`}
                type="button"
              >
                {move === 0 ? "Start" : `Move #${move}`}
              </button>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
