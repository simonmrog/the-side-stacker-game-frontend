import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { errorCatalog } from "./config/errorCatalog";
import { IPlayer } from "./interfaces/player.interface";
import { IGameState, IGameStateEvent, IErrorMessageEvent } from "./interfaces/sideStacker.interface";
import { ReducerActions } from "./contexts/gameContext.interface";

import socketService from "./services/socketService";
import { useSocketContext } from "./hooks/useSocketContext";
import { useGameContext } from "./hooks/useGameContext";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const { setConnection, setError, setEventOnHold } = useSocketContext();
  const { player, setGameOnCourse, dispatch } = useGameContext();

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

    const onGameBusy = (event: string) => {
      console.log(`[Event]: ${event}`);
      setGameOnCourse(true);
    };

    const onPlayerJoined = (event: string, game: unknown) => {
      setEventOnHold(false);
      console.log(`[Event]: ${event}`, game);
      dispatch({ type: ReducerActions.UPDATE_GAME, payload: { gameState: game as IGameState } });
      if ((game as IGameState).players.length === 2 && !player) setError(errorCatalog.GAME_BUSY);
    };

    const onPlayerGenerated = (event: string, player: unknown) => {
      console.log(`[Event]: ${event}`, player);
      dispatch({ type: ReducerActions.UPDATE_PLAYER_ID, payload: { player: player as IPlayer } });
    };

    const onGameUpdate = (event: string, game: unknown) => {
      if (event === "player-moved") setEventOnHold(false);
      console.log(`[Event]: ${event}`, game);
      dispatch({ type: ReducerActions.UPDATE_GAME, payload: { gameState: game as IGameState } });
    };

    const onGameFinished = (event: string, game: unknown) => {
      console.log(`[Event]: ${event}`, game);
    };

    const onGameDisconnected = (event: string, payload: unknown) => {
      const { player: playerDisconnected, gameState } = payload as IGameStateEvent;
      console.log(`[Event]: ${event}`, gameState);
      console.log(`${playerDisconnected} disconnected from the game`);
      // if the player was in the game, we notify that the game was closed due to a lack of players
      setError(null);
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
      console.log("[Event] socket connection established");
      setConnection(true);
    });

    socketService.on("connecting", () => {
      console.log("[Event]: connecting");
    });

    socketService.on("connect_failed", () => {
      console.log("[Event]: connect_failed");
      setConnection(false);
    });

    socketService.on("disconnect", reason => {
      console.log("Socket connection dismissed:", reason);
      setConnection(false);
      setError(errorCatalog.SERVER_ERROR);
    });

    // game related events
    socketService.on("game-created", (game: unknown) => onGameStart("game-created", game));
    socketService.on("game-busy", () => onGameBusy("game-busy"));
    socketService.on("game-restarted", (game: unknown) => onGameStart("game-restarted", game));
    socketService.on("player-joined", (game: unknown) => onPlayerJoined("player-joined", game));
    socketService.on("player-generated", (payload: unknown) => onPlayerGenerated("player-generated", payload));
    socketService.on("waiting-for-second-user", (game: unknown) => onGameUpdate("waiting-for-second-user", game));
    socketService.on("player-moved", (game: unknown) => onGameUpdate("player-moved", game));
    socketService.on("game-finished", (game: unknown) => onGameFinished("game-finished", game));
    socketService.on("game-disconnected", (payload: unknown) => onGameDisconnected("game-disconnected", payload));
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
