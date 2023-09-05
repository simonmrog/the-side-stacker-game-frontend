import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { errorCatalog } from "../../config/errorCatalog";
import { GameStatus } from "../../interfaces/sideStacker.interface";
import socketService from "../../services/socketService";
import { useSocketContext } from "../../hooks/useSocketContext";
import { useGameContext } from "../../hooks/useGameContext";

import { HomeStyledWrapper, HomeStyledErrorMessage } from "./styles";
import Button from "../../components/Button/Button";

function Home() {
  const { isConnected, error, setError } = useSocketContext();
  const { gameState, player, gameOnCourse, setGameOnCourse, newGame, joinGame } = useGameContext();
  const navigate = useNavigate();

  const playerExists = (playerId: string) => gameState?.players.find(player => player.id === playerId);

  const canJoinGame = () =>
    gameState?.status === GameStatus.WAITING_FOR_SECOND_USER && !playerExists(socketService.getId());

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

  useEffect(() => {
    if (gameOnCourse && !player) setError(errorCatalog.GAME_BUSY);
  }, [gameOnCourse]);

  return (
    <HomeStyledWrapper className="home">
      <div className="home-content-wrapper">
        <div className="home-title">Side-Stacker Game</div>

        {!gameState && !gameOnCourse && (
          <Button disabled={!isConnected} onClick={handleNewGame}>
            New Game
          </Button>
        )}
        {canJoinGame() && (
          <Button disabled={!isConnected} onClick={handleJoinGame}>
            Join Game
          </Button>
        )}
        {!isConnected && <HomeStyledErrorMessage>Cannot connect to the server</HomeStyledErrorMessage>}
        {error && <HomeStyledErrorMessage>{error}</HomeStyledErrorMessage>}
      </div>
    </HomeStyledWrapper>
  );
}

export default Home;
