import config from "../../config/config";
import { useGameContext } from "../../hooks/useGameContext";

import { MovesBoardStyledWrapper, MovesBoardStyledPanel } from "./styles";

function MovesBoard() {
  const { gameState } = useGameContext();

  // This function shows a filtered list of moves (the last 5 by default)
  const lastMoves = (): Array<string> | null | undefined => {
    if (!gameState) return null;
    const enoughMoves = gameState.moves.length <= config.MOVES_TO_SHOW;
    return enoughMoves ? gameState.moves : gameState.moves.slice(-config.MOVES_TO_SHOW);
  };

  // Gets the player's color getting by regex the name of the player and contrasting with the list of players
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
              {lastMoves() && lastMoves()!.length > 0 ? (
                lastMoves()?.map((move, index) => (
                  <li style={{ color: getPlayerColor(move) }} key={index}>
                    {index + 1}. {move}
                  </li>
                ))
              ) : (
                <li>No moves yet</li>
              )}
            </ul>
          }
        </div>
      </MovesBoardStyledPanel>
    </MovesBoardStyledWrapper>
  );
}

export default MovesBoard;
