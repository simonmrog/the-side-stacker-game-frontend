import React from "react";
import { useState, useEffect } from "react";

import socketService from "./services/socketService";

import { GameState, GameStatus } from "./interfaces/sideStacker.interface";
import Board from "./components/Board/Board";

function App() {
  const [isConnected, setIsConnected] = useState(socketService.isConnected());
  const [game, setGame] = useState<GameState | null>(null);

  useEffect(() => {
    socketService.connect();

    socketService.on("connect", () => {
      console.log("Socket connection established");
      setIsConnected(true);
    });

    socketService.on("disconnect", reason => {
      console.log("Socket connection dismissed:", reason);
      setIsConnected(false);
    });

    socketService.on("connect_failed", () => {
      console.log("[Event]: connect_failed");
      setIsConnected(false);
      document.write("Cannot connect to the server");
    });

    socketService.on("game-created", (game: unknown) => {
      console.log("[Event]: game-created", game);
      setGame(game as GameState);
    });

    socketService.on("player-joined", (game: unknown) => {
      console.log("[Event]: user-joined");
      setGame(game as GameState);
    });

    socketService.on("waiting-for-second-user", (game: unknown) => {
      console.log("[Event]: waiting-for-second-user");
      setGame(game as GameState);
    });

    socketService.on("game-restarted", (game: unknown) => {
      console.log("[Event]: game-restarted");
      setGame(game as GameState);
    });

    return () => {
      socketService.disconnect();
      socketService.off("connect");
      socketService.off("disconnect");
      socketService.off("connect_failed");
      socketService.off("game-created");
      socketService.off("player-joined");
      socketService.off("waiting-for-second-user");
      socketService.off("game-restarted");
    };
  }, []);

  const newGame = () => socketService.emit("new-game");
  const restartGame = () => socketService.emit("restart-game");
  const joinGame = () => socketService.emit("join-game");

  const canJoinGame = () =>
    game?.status === GameStatus.WAITING_FOR_SECOND_USER && !game.players.includes(socketService.getId());

  const waitingForUser = () =>
    game?.status === GameStatus.WAITING_FOR_SECOND_USER && game.players.includes(socketService.getId());

  return (
    <div className="App">
      <h1>The Side Stacker Game</h1>
      {!isConnected && <div>Cannot connect to the server</div>}
      {isConnected && (
        <>
          {!game && <button onClick={newGame}>New Game</button>}

          {canJoinGame() && <button onClick={joinGame}>Join Game</button>}

          {waitingForUser() && <div>Waiting for someone to join the game</div>}

          {game?.status === GameStatus.STARTED && (
            <>
              <Board board={game.board} />
              <button onClick={restartGame}>Restart</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
