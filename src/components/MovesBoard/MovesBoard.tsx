import { useGameContext } from "../../hooks/useGameContext";

function MovesBoard() {
  const { gameState } = useGameContext();

  const getPlayerColor = (move: string) => {
    const regex = new RegExp(/Player (\d+)/i);
    const playerName = regex.exec(move);
    if (!playerName) return "black";
    const player = gameState?.players.find(p => p.name === playerName[0]);
    return player?.color;
  };

  return (
    <div>
      <h1>Moves</h1>
      <div>
        {
          <ul>
            {gameState?.moves.map((move, index) => (
              <li style={{ color: getPlayerColor(move) }} key={index}>
                {move}
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default MovesBoard;
