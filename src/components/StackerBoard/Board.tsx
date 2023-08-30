import React from "react";

import { useGameContext } from "../../hooks/useGameContext";
import { TBoard } from "../../interfaces/sideStacker.interface";
import Row from "./Row";

import { StyledBoard, StyledResultMessage } from "./styles";

interface IBoardProps {
  board: TBoard;
}

function Table({ board }: IBoardProps) {
  const { playerId, gameState } = useGameContext();

  const getResultMessage = () => (playerId === gameState?.winnerId ? `${playerId} won` : `${playerId} lost`);

  return (
    <>
      <StyledBoard className="Table">
        {board.map((row, rIndex) => (
          <Row key={rIndex} row={row} rIndex={rIndex} />
        ))}
      </StyledBoard>
      <StyledResultMessage>{gameState?.winnerId && <label>{getResultMessage()}</label>}</StyledResultMessage>
    </>
  );
}

export default Table;
