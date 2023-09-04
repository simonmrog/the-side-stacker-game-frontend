import { useNavigate } from "react-router-dom";

import { GameStatus } from "../../interfaces/sideStacker.interface";
import socketService from "../../services/socketService";
import { useSocketContext } from "../../hooks/useSocketContext";
import { useGameContext } from "../../hooks/useGameContext";

import { HomeStyledWrapper, HomeStyledConnectMessage, HomeStyledErrorMessage } from "./styles";
import Button from "../../components/Button/Button";

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
    <HomeStyledWrapper className="home">
      <div className="home-content-wrapper">
        <div className="home-title">Side-Stacker Game</div>

        {!gameState && (
          <Button disabled={!isConnected} onClick={handleNewGame}>
            New Game
          </Button>
        )}
        {canJoinGame() && (
          <Button disabled={!isConnected} onClick={handleJoinGame}>
            Join Game
          </Button>
        )}
        {gameState && gameIsOnCourse() && <></>}
        {!isConnected && <HomeStyledConnectMessage>Error: Cannot connect to the server</HomeStyledConnectMessage>}
        {error && <HomeStyledErrorMessage>An error occurred: {error}</HomeStyledErrorMessage>}
      </div>
    </HomeStyledWrapper>
  );
}

export default Home;
