import React from "react";

import { useGameContext } from "../../hooks/useGameContext";

function MovesBoard() {
  const { gameState } = useGameContext();

  return (
    <div>
      <h1>Moves</h1>
      <div>
        {
          <ul>
            {gameState?.moves.map((move, index) => (
              <li key={index}></li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default MovesBoard;
