import { StyledRow } from "./styles";

import socketService from "../../services/socketService";
import { GameStatus, TRow, TCell, IMove, ISide } from "../../interfaces/sideStacker.interface";
import { useGameContext } from "../../hooks/useGameContext";

import DirectionButton from "../DirectionButton/DirectionButton";
import Cell from "./Cell";
import { useSocketContext } from "../../hooks/useSocketContext";

interface IRowProps {
  row: TRow;
  rIndex: number;
}

function Row({ row, rIndex }: IRowProps) {
  const { eventOnHold, setEventOnHold } = useSocketContext();
  const { player, gameState } = useGameContext();

  const handleMove = (row: number, side: ISide) => {
    const move: IMove = { row, side };
    socketService.emit("move", move);
    setEventOnHold(true);
  };

  const canMakeMove = () => {
    const fullRow = () => row.every((cell: TCell) => cell !== null);
    // The button should be disabled when the row is full, when the game is finished or when is not the user's move
    return (
      !eventOnHold && !fullRow() && gameState?.status === GameStatus.STARTED && gameState?.currentPlayer === player?.id
    );
  };

  return (
    <StyledRow className="row">
      <DirectionButton
        className="row-left-button"
        direction="right"
        onClick={() => handleMove(rIndex, "left")}
        disabled={!canMakeMove()}
      />
      {row.map((player, cIndex) => (
        <Cell key={`${rIndex}-${cIndex}`} player={player} />
      ))}
      <DirectionButton
        className="row-right-button"
        direction="left"
        onClick={() => handleMove(rIndex, "right")}
        disabled={!canMakeMove()}
      />
    </StyledRow>
  );
}

export default Row;
