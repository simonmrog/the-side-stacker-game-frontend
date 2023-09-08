import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { StyledResultMessage } from "./styles";

import { GameStatus } from "../../interfaces/game.interface";
import socketService from "../../services/socketService";
import { useGameContext } from "../../hooks/useGameContext";

import { GameBoardStyledWrapper, GameBoardStyledContent } from "./styles";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import PlayerTitle from "../../components/PlayerTitle/PlayerTitle";
import Board from "../../components/StackerBoard/Board";
import MovesBoard from "../../components/MovesBoard/MovesBoard";
import { useSocketContext } from "../../hooks/useSocketContext";

function GameBoard() {
  const { isLoading, eventOnHold, setEventOnHold } = useSocketContext();
  const { player, gameState, gameOnCourse, restartGame } = useGameContext();
  const navigate = useNavigate();

  // If the game is not active, redirects to home page
  useEffect(() => {
    if (!gameOnCourse) navigate("/");
  }, [gameState]);

  const getResultMessage = () => (player?.id === gameState?.winnerId ? `${player?.name} won` : `${player?.name} lost`);

  // Check whether the player exists in the game or not
  const playerExists = (playerId: string) => gameState?.players.find(player => player.id === playerId);

  const waitingForUser = () =>
    gameState?.status === GameStatus.WAITING_FOR_SECOND_USER && playerExists(socketService.getId());

  const onRestart = () => {
    setEventOnHold(true);
    restartGame();
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <GameBoardStyledWrapper className="game-board">
          {
            <div className="game-board-title">
              <h2>Side-Stacker Game</h2>
              {gameState?.winnerId && (
                <StyledResultMessage className="game-board-styled-result-message">
                  <label data-testid="game-board.result-message">{getResultMessage()}</label>
                </StyledResultMessage>
              )}
            </div>
          }
          {!gameOnCourse && <div className="game-board-no-game-oncourse">No game in course, redirecting...</div>}
          {gameOnCourse && waitingForUser() && (
            <div data-testid="game-board.waiting-message" className="game-board-waiting-message">
              Waiting for someone to join the game...
            </div>
          )}
          {gameOnCourse && !waitingForUser() && (
            <GameBoardStyledContent className="game-board-content">
              <div className="game-board-game-wrapper">
                <PlayerTitle player={player} />
                <Board />
              </div>
              <MovesBoard />
              <div
                className="game-board-restart-button-wrapper"
                style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
              >
                <Button
                  testId="game-board.restart-button"
                  className="game-board-restart-button"
                  style={{ fontSize: "1em", padding: "10px 20px" }}
                  disabled={eventOnHold}
                  onClick={onRestart}
                >
                  Restart
                </Button>
              </div>
            </GameBoardStyledContent>
          )}
        </GameBoardStyledWrapper>
      )}
    </>
  );
}

export default GameBoard;
