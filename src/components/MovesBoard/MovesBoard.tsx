import config from "../../config/config";
import { useGameContext } from "../../hooks/useGameContext";

import { MovesBoardStyledWrapper, MovesBoardStyledPanel } from "./styles";

function MovesBoard() {
  const { gameState } = useGameContext();

  const lastMoves = (): Array<string> | null | undefined => {
    if (!gameState) return null;
    const enoughMoves = gameState.moves.length <= config.MOVES_TO_SHOW;
    return enoughMoves ? gameState.moves : gameState.moves.slice(-config.MOVES_TO_SHOW);
  };

  const getPlayerColor = (move: string) => {
    const regex = new RegExp(/Player (\d+)/i);
    const playerName = regex.exec(move);
    if (!playerName) return "black";
    const player = gameState?.players.find(p => p.name === playerName[0]);
    return player?.color;
  };

  return (
    <MovesBoardStyledWrapper className="moves-board-wrapper">
      <p>Last Moves</p>
      <MovesBoardStyledPanel>
        <div>
          {
            <ul>
              {lastMoves() && lastMoves()!.length > 0
                ? lastMoves()?.map((move, index) => (
                    <li style={{ color: getPlayerColor(move) }} key={index}>
                      {index + 1}. {move}
                    </li>
                  ))
                : "No moves yet"}
            </ul>
          }
        </div>
      </MovesBoardStyledPanel>
    </MovesBoardStyledWrapper>
  );
}

export default MovesBoard;
