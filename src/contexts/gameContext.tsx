import { useReducer, createContext, Reducer } from "react";

import {
  ReducerActions,
  IReducerAction,
  IReducerState,
  IGameContext,
  IGameProviderProps,
} from "./gameContext.interface";

export const GameContext = createContext<IGameContext>({
  playerId: null,
  gameState: null,
  dispatch: () => undefined,
});

export function GameProvider({ children }: IGameProviderProps) {
  const reducer: Reducer<IReducerState, IReducerAction> = (state: IReducerState, action: IReducerAction) => {
    switch (action.type) {
      case ReducerActions.UPDATE_PLAYER_ID:
        return { ...state, playerId: action.payload.playerId };
      case ReducerActions.UPDATE_GAME:
        return { ...state, gameState: action.payload.gameState };
      default:
        throw new Error("[Reducer Error] Invalid action");
    }
  };

  const [gameState, dispatch] = useReducer(reducer, {
    playerId: null,
    gameState: null,
  });

  return <GameContext.Provider value={{ ...gameState, dispatch }}>{children}</GameContext.Provider>;
}
