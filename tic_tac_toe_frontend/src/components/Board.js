import React from "react";
import Square from "./Square";

// PUBLIC_INTERFACE
export default function Board({ squares, onSquareClick, winningLine }) {
  /** Board component for Tic Tac Toe.
   * @param squares array: 9 items, 'X', 'O', or null
   * @param onSquareClick function: handler for square click (index)
   * @param winningLine array: indices of winning squares
   */
  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => onSquareClick(i)}
      idx={i}
      highlight={winningLine && winningLine.includes(i)}
    />
  );

  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
      {[0, 1, 2].map(row =>
        <div className="ttt-row" key={row} role="row">
          {[0, 1, 2].map(col =>
            <div className="ttt-cell" role="gridcell" key={row * 3 + col}>
              {renderSquare(row * 3 + col)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
