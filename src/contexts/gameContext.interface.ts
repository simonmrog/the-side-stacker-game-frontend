import { IPlayer } from "../interfaces/player.interface";
import { IGameState } from "../interfaces/sideStacker.interface";

export enum ReducerActions {
  UPDATE_PLAYER_ID = "update-player-id",
  UPDATE_GAME = "update-game",
}

export interface IReducerState {
  player: IPlayer | null | undefined;
  gameState: IGameState | null | undefined;
}

export interface IReducerAction {
  type: string;
  payload: IReducerActionPayload;
}

export interface IReducerActionPayload {
  player?: IPlayer;
  gameState?: IGameState;
}

export interface IGameContext {
  player: IPlayer | null | undefined;
  gameState: IGameState | null | undefined;
  dispatch: (action: IReducerAction) => void;
}

export interface IGameProviderProps {
  children: React.ReactNode;
}
