import React from "react";

// PUBLIC_INTERFACE
export default function Square({ value, onClick, highlight, idx }) {
  /** Square component for the Tic Tac Toe board. Accessible and animated.
   * @param value string: 'X', 'O', or null
   * @param onClick function: click handler
   * @param highlight boolean: whether square is part of winning line
   * @param idx number: index for aria-label
   */

  const ariaLabels = [
    "top left", "top center", "top right",
    "middle left", "middle center", "middle right",
    "bottom left", "bottom center", "bottom right",
  ];

  return (
    <button
      className={`ttt-square${highlight ? " highlight" : ""}${value ? " filled" : ""}`}
      onClick={onClick}
      aria-label={`Square ${ariaLabels[idx]} ${value ? `(${value})` : ""}`}
      aria-pressed={!!value}
      role="button"
      tabIndex="0"
      type="button"
    >
      <span className="square-value">{value}</span>
    </button>
  );
}
