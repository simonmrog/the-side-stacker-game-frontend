import React from "react";

import { StyledBoard } from "./styles";

import { useGameContext } from "../../hooks/useGameContext";

import Row from "./Row";

function Board() {
  const { gameState } = useGameContext();

  return (
    <>
      <StyledBoard className="Board">
        {gameState?.board.map((row, rIndex) => (
          <Row key={rIndex} row={row} rIndex={rIndex} />
        ))}
      </StyledBoard>
    </>
  );
}

export default Board;
