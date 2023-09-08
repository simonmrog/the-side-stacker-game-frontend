import { useState, useReducer, createContext, Reducer } from "react";

import {
  ReducerActions,
  IReducerAction,
  IReducerState,
  IGameContext,
  IGameProviderProps,
} from "./gameContext.interface";
import socketService from "../services/socketService";

/*
  This context will handle the basic game state
  the actual player, the gameOnCourse flag and the game variables
*/
export const GameContext = createContext<IGameContext>({
  player: null,
  gameState: null,
  gameOnCourse: false,
  setGameOnCourse: () => undefined,
  newGame: () => undefined,
  restartGame: () => undefined,
  joinGame: () => undefined,
  dispatch: () => undefined,
});

export function GameProvider({ children }: IGameProviderProps) {
  const reducer: Reducer<IReducerState, IReducerAction> = (state: IReducerState, action: IReducerAction) => {
    switch (action.type) {
      case ReducerActions.UPDATE_PLAYER_ID:
        return { ...state, player: action.payload.player };
      case ReducerActions.UPDATE_GAME:
        return { ...state, gameState: action.payload.gameState };
      default:
        console.error("[Reducer Error] Invalid action");
        return { ...state };
    }
  };

  // game state
  const [gameOnCourse, setGameOnCourse] = useState<boolean>(false);
  const [gameState, dispatch] = useReducer(reducer, {
    player: null,
    gameState: null,
  });

  const newGame = () => {
    // SocketIO guarantees the same event order
    socketService.emit("new-game");
    // socketService.emit("join-game");
  };

  const restartGame = () => {
    socketService.emit("restart-game");
    socketService.emit("join-game");
  };

  const joinGame = () => socketService.emit("join-game");

  return (
    <GameContext.Provider
      value={{ ...gameState, gameOnCourse, setGameOnCourse, newGame, restartGame, joinGame, dispatch }}
    >
      {children}
    </GameContext.Provider>
  );
}
