import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { IPlayer } from "./interfaces/player.interface";
import { IGameState, IGameStateEvent, IErrorMessageEvent } from "./interfaces/sideStacker.interface";
import { ReducerActions } from "./contexts/gameContext.interface";

import socketService from "./services/socketService";
import { useSocketContext } from "./hooks/useSocketContext";
import { useGameContext } from "./hooks/useGameContext";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const { setConnection, setError } = useSocketContext();
  const { setGameOnCourse, dispatch } = useGameContext();

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

    const onPlayerGenerated = (event: string, player: unknown) => {
      console.log(`[Event]: ${event}`, player);
      dispatch({ type: ReducerActions.UPDATE_PLAYER_ID, payload: { player: player as IPlayer } });
    };

    const onGameUpdate = (event: string, game: unknown) => {
      console.log(`[Event]: ${event}`, game);
      dispatch({ type: ReducerActions.UPDATE_GAME, payload: { gameState: game as IGameState } });
    };

    const onGameFinished = (event: string, game: unknown) => {
      console.log(`[Event]: ${event}`, game);
      dispatch({ type: ReducerActions.UPDATE_GAME, payload: { gameState: null } });
      setGameOnCourse(false);
    };

    const onGameDisconnected = (event: string, payload: unknown) => {
      const { player, gameState } = payload as IGameStateEvent;
      console.log(`[Event]: ${event}`, gameState);
      console.log(`${player.id} disconnected from the game`);
      dispatch({ type: ReducerActions.UPDATE_GAME, payload: { gameState } });
      setGameOnCourse(false);
    };

    const onException = (event: string, error: unknown) => {
      console.log(`[Event]: ${event}`, error);
      setError((error as IErrorMessageEvent).errorMessage);
    };

    socketService.connect();

    // connection related events
    socketService.on("connect", () => {
      console.log("Socket connection established");
      setConnection(true);
    });

    socketService.on("connecting", () => {
      console.log("[Event]: connecting");
      document.write("Connecting...");
    });

    socketService.on("connect_failed", () => {
      console.log("[Event]: connect_failed");
      setConnection(false);
      setError("Cannot connect to the server");
    });

    socketService.on("disconnect", reason => {
      console.log("Socket connection dismissed:", reason);
      setConnection(false);
    });

    // game related events
    socketService.on("game-created", (game: unknown) => onGameStart("game-created", game));
    socketService.on("game-restarted", (game: unknown) => onGameStart("game-restarted", game));
    socketService.on("player-joined", (game: unknown) => onPlayerJoined("player-joined", game));
    socketService.on("player-generated", (payload: unknown) => onPlayerGenerated("player-generated", payload));
    socketService.on("waiting-for-second-user", (game: unknown) => onGameUpdate("waiting-for-second-user", game));
    socketService.on("player-moved", (game: unknown) => onGameUpdate("player-moved", game));
    socketService.on("game-finished", (game: unknown) => onGameFinished("game-finished", game));
    socketService.on("game-disconnected", (payload: unknown) => onGameDisconnected("game-finished", payload));
    socketService.on("exception", (error: unknown) => onException("exception", error));

    return () => {
      // cleaning up event listeners
      socketService.disconnect();
      socketService.off("connect");
      socketService.off("connecting");
      socketService.off("connect_failed");
      socketService.off("disconnect");
      socketService.off("exception");
      socketService.off("game-created");
      socketService.off("game-restarted");
      socketService.off("player-joined");
      socketService.off("player-generated");
      socketService.off("waiting-for-second-user");
      socketService.off("player-moved");
      socketService.off("game-finished");
      socketService.off("game-disconnected");
    };
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
