import { IPlayer } from "./player.interface";

export interface IGameState {
  status: GameStatus;
  board: TBoard;
  players: Array<IPlayer>;
  currentPlayer: string | null;
  moves: Array<string>;
  winnerId: string | null;
}

// Possible states of the game flow
export enum GameStatus {
  NOT_STARTED = "not-started",
  WAITING_FOR_SECOND_USER = "waiting-for-second-user",
  STARTED = "started",
  FINISHED = "finished",
}

export type TBoard = Array<TRow>;

export type TRow = Array<TCell>;

export type TCell = IPlayer;

export interface IMove {
  row: number;
  side: ISide;
}

export type ISide = "left" | "right";

// Event interfaces
export interface IGameStateEvent {
  player: IPlayer;
  gameState: IGameState;
}

export interface IErrorMessageEvent {
  errorMessage: string;
}
