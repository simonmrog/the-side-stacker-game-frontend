import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { StyledResultMessage } from "./styles";

import { GameStatus } from "../../interfaces/sideStacker.interface";
import socketService from "../../services/socketService";
import { useGameContext } from "../../hooks/useGameContext";

import Board from "../../components/StackerBoard/Board";
import MovesBoard from "../../components/MovesBoard/MovesBoard";

function GameBoard() {
  const { player, gameState, gameOnCourse, restartGame } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!gameOnCourse) navigate("/");
  }, []);

  const getResultMessage = () => (player?.id === gameState?.winnerId ? `${player?.id} won` : `${player?.id} lost`);

  const playerExists = (playerId: string) => gameState?.players.find(player => player.id === playerId);

  const waitingForUser = () =>
    gameState?.status === GameStatus.WAITING_FOR_SECOND_USER && playerExists(socketService.getId());

  return (
    <>
      {!gameOnCourse && <label>No game in course, redirecting...</label>}
      {gameOnCourse && waitingForUser() && <div>Waiting for someone to join the game...</div>}
      {gameOnCourse && !waitingForUser() && (
        <div>
          <h1>Board</h1>
          <Board />
          <MovesBoard />
          <button onClick={restartGame}>Restart</button>
          <StyledResultMessage>{gameState?.winnerId && <label>{getResultMessage()}</label>}</StyledResultMessage>
        </div>
      )}
    </>
  );
}

export default GameBoard;
