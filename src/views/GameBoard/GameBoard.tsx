import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { StyledResultMessage } from "./styles";

import { GameStatus } from "../../interfaces/sideStacker.interface";
import socketService from "../../services/socketService";
import { useGameContext } from "../../hooks/useGameContext";

import { GameBoardStyledWrapper } from "./styles";
import Button from "../../components/Button/Button";
import PlayerTitle from "../../components/PlayerTitle/PlayerTitle";
import Board from "../../components/StackerBoard/Board";
import MovesBoard from "../../components/MovesBoard/MovesBoard";

function GameBoard() {
  const { player, gameState, gameOnCourse, restartGame } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!gameOnCourse) navigate("/");
  }, [gameState]);

  const getResultMessage = () => (player?.id === gameState?.winnerId ? `${player?.name} won` : `${player?.name} lost`);

  const playerExists = (playerId: string) => gameState?.players.find(player => player.id === playerId);

  const waitingForUser = () =>
    gameState?.status === GameStatus.WAITING_FOR_SECOND_USER && playerExists(socketService.getId());

  return (
    <GameBoardStyledWrapper className="game-board">
      {
        <div className="game-board-title">
          <h2>Side-Stacker Game</h2>
        </div>
      }
      {!gameOnCourse && <label>No game in course, redirecting...</label>}
      {gameOnCourse && waitingForUser() && <div>Waiting for someone to join the game...</div>}
      {gameOnCourse && !waitingForUser() && (
        <div>
          <PlayerTitle player={player} />
          <Board />
          <MovesBoard />
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
            <Button style={{ fontSize: "1em", padding: "10px 20px" }} onClick={restartGame}>
              Restart
            </Button>
          </div>
          <StyledResultMessage>{gameState?.winnerId && <label>{getResultMessage()}</label>}</StyledResultMessage>
        </div>
      )}
    </GameBoardStyledWrapper>
  );
}

export default GameBoard;
