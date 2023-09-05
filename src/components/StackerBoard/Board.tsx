import { BoardStyledWrapper } from "./styles";

import { useGameContext } from "../../hooks/useGameContext";

import Row from "./Row";

function Board() {
  const { gameState } = useGameContext();

  return (
    <BoardStyledWrapper className="board">
      {gameState?.board.map((row, rIndex) => (
        <Row key={rIndex} row={row} rIndex={rIndex} />
      ))}
    </BoardStyledWrapper>
  );
}

export default Board;
