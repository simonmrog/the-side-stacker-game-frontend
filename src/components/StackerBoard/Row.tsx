import React from "react";

import socketService from "../../services/socketService";

import { GameStatus, TRow, TCell, IMove, ISide } from "../../interfaces/sideStacker.interface";
import Cell from "./Cell";
import { StyledRow } from "./styles";

import { useGameContext } from "../../hooks/useGameContext";

interface IRowProps {
  row: TRow;
  rIndex: number;
}

function Row({ row, rIndex }: IRowProps) {
  const { player, gameState } = useGameContext();

  const handleMove = (row: number, side: ISide) => {
    const move: IMove = { row, side };
    socketService.emit("move", move);
  };

  const canMakeMove = () => {
    const fullRow = () => row.every((cell: TCell) => cell !== null);
    // The button should be disabled when the row is full, when the game is finished or when is not the user's move
    return !fullRow() && gameState?.status === GameStatus.STARTED && gameState?.currentPlayer === player?.id;
  };

  return (
    <StyledRow className="Row">
      <button className="row-left-button" onClick={() => handleMove(rIndex, "left")} disabled={!canMakeMove()}>
        Left
      </button>
      {row.map((player, cIndex) => (
        <Cell key={`${rIndex}-${cIndex}`} player={player} />
      ))}
      <button className="row-right-button" onClick={() => handleMove(rIndex, "right")} disabled={!canMakeMove()}>
        Right
      </button>
    </StyledRow>
  );
}

export default Row;
