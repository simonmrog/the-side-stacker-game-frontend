import { useReducer, createContext, Reducer } from "react";

import {
  ReducerActions,
  IReducerAction,
  IReducerState,
  IGameContext,
  IGameProviderProps,
} from "./gameContext.interface";

export const GameContext = createContext<IGameContext>({
  player: null,
  gameState: null,
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
        throw new Error("[Reducer Error] Invalid action");
    }
  };

  const [gameState, dispatch] = useReducer(reducer, {
    player: null,
    gameState: null,
  });

  return <GameContext.Provider value={{ ...gameState, dispatch }}>{children}</GameContext.Provider>;
}
