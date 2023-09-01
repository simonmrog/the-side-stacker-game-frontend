import { useNavigate } from "react-router-dom";

import { GameStatus } from "../../interfaces/sideStacker.interface";
import socketService from "../../services/socketService";
import { useSocketContext } from "../../hooks/useSocketContext";
import { useGameContext } from "../../hooks/useGameContext";

function Home() {
  const { isConnected, error } = useSocketContext();
  const { gameState, setGameOnCourse, newGame, joinGame } = useGameContext();
  const navigate = useNavigate();

  const playerExists = (playerId: string) => gameState?.players.find(player => player.id === playerId);

  const canJoinGame = () =>
    gameState?.status === GameStatus.WAITING_FOR_SECOND_USER && !playerExists(socketService.getId());

  const gameIsOnCourse = () => gameState?.status === GameStatus.STARTED || gameState?.status === GameStatus.FINISHED;

  const handleNewGame = () => {
    newGame();
    setGameOnCourse(true);
    navigate("/game");
  };

  const handleJoinGame = () => {
    joinGame();
    setGameOnCourse(true);
    navigate("/game");
  };

  return (
    <div>
      <h1>The Side Stacker Game</h1>
      {!isConnected && <label>Cannot connect to the server</label>}
      {isConnected && (
        <>
          {!gameState && <button onClick={handleNewGame}>New Game</button>}
          {canJoinGame() && <button onClick={handleJoinGame}>Join Game</button>}
          {gameState && gameIsOnCourse() && <></>}
        </>
      )}
      {error && <label>An error occurred: {error}</label>}
    </div>
  );
}

export default Home;
