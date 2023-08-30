import React, { useState, useEffect } from "react";

import { IGameState, GameStatus, IGameStateEvent } from "./interfaces/sideStacker.interface";
import { ReducerActions } from "./contexts/gameContext.interface";
import socketService from "./services/socketService";
import { useGameContext } from "./hooks/useGameContext";
import Board from "./components/StackerBoard/SideStacker";

function App() {
  const [isConnected, setIsConnected] = useState(socketService.isConnected());
  const { gameState, dispatch } = useGameContext();

  // Disconnects the socket connection
  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  // Handles the game events
  useEffect(() => {
    const onGameStart = (event: string, game: unknown) => {
      console.log(`[Event]: ${event}`, game);
      dispatch({ type: ReducerActions.UPDATE_GAME, payload: { gameState: game as IGameState } });
    };

    const onPlayerJoined = (event: string, game: unknown) => {
      console.log(`[Event]: ${event}`, game);
      dispatch({ type: ReducerActions.UPDATE_GAME, payload: { gameState: game as IGameState } });
    };

    const onPlayerIdGenerated = (event: string, playerId: unknown) => {
      console.log(`[Event]: ${event}`, playerId);
      dispatch({ type: ReducerActions.UPDATE_PLAYER_ID, payload: { playerId: playerId as string } });
    };

    const onGameUpdate = (event: string, game: unknown) => {
      console.log(`[Event]: ${event}`, game);
      dispatch({ type: ReducerActions.UPDATE_GAME, payload: { gameState: game as IGameState } });
    };

    const onGameFinished = (event: string, game: unknown) => {
      console.log(`[Event]: ${event}`, game);
    };

    const onGameDisconnected = (event: string, payload: unknown) => {
      const { playerId, gameState } = payload as IGameStateEvent;
      console.log(`[Event]: ${event}`, gameState);
      console.log(`${playerId} disconnected from the game`);
      dispatch({ type: ReducerActions.UPDATE_GAME, payload: { gameState } });
    };

    socketService.connect();

    socketService.on("connect", () => {
      console.log("Socket connection established");
      setIsConnected(true);
    });

    socketService.on("connecting", () => {
      console.log("[Event]: connecting");
      document.write("Connecting...");
    });

    socketService.on("connect_failed", () => {
      console.log("[Event]: connect_failed");
      setIsConnected(false);
      document.write("Cannot connect to the server");
    });

    socketService.on("disconnect", reason => {
      console.log("Socket connection dismissed:", reason);
      setIsConnected(false);
    });

    // game interactions
    socketService.on("game-created", (game: unknown) => onGameStart("game-created", game));
    socketService.on("game-restarted", (game: unknown) => onGameStart("game-restarted", game));
    socketService.on("player-joined", (game: unknown) => onPlayerJoined("player-joined", game));
    socketService.on("player-id-generated", (payload: unknown) => onPlayerIdGenerated("player-id-generated", payload));
    socketService.on("waiting-for-second-user", (game: unknown) => onGameUpdate("waiting-for-second-user", game));
    socketService.on("player-moved", (game: unknown) => onGameUpdate("player-moved", game));
    socketService.on("game-finished", (game: unknown) => onGameFinished("game-finished", game));
    socketService.on("game-disconnected", (payload: unknown) => onGameDisconnected("game-finished", payload));

    return () => {
      socketService.disconnect();
      socketService.off("connect");
      socketService.off("connecting");
      socketService.off("connect_failed");
      socketService.off("disconnect");
      socketService.off("game-created");
      socketService.off("game-restarted");
      socketService.off("player-joined");
      socketService.off("player-id-generated");
      socketService.off("waiting-for-second-user");
      socketService.off("player-moved");
      socketService.off("game-finished");
      socketService.off("game-disconnected");
    };
  }, []);

  const newGame = () => {
    socketService.emit("new-game");
    socketService.emit("join-game");
  };
  const restartGame = () => socketService.emit("restart-game");
  const joinGame = () => socketService.emit("join-game");

  const canJoinGame = () =>
    gameState?.status === GameStatus.WAITING_FOR_SECOND_USER && !gameState.players.includes(socketService.getId());

  const waitingForUser = () =>
    gameState?.status === GameStatus.WAITING_FOR_SECOND_USER && gameState.players.includes(socketService.getId());

  const gameIsOnCourse = () => gameState?.status === GameStatus.STARTED || gameState?.status === GameStatus.FINISHED;

  return (
    <div className="App">
      <h1>The Side Stacker Game</h1>
      {!isConnected && <div>Cannot connect to the server</div>}
      {isConnected && (
        <>
          {!gameState && <button onClick={newGame}>New Game</button>}

          {canJoinGame() && <button onClick={joinGame}>Join Game</button>}

          {waitingForUser() && <div>Waiting for someone to join the game...</div>}

          {gameState && gameIsOnCourse() && (
            <>
              <Board board={gameState.board} />
              <button onClick={restartGame}>Restart</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
