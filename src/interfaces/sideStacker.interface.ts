// react state interface
export interface IGameState {
  status: GameStatus;
  board: TBoard;
  players: Array<Player>;
  currentPlayer: string | null;
  moves: Array<string>;
  winnerId: string | null;
}

// possible states of the game flow
export enum GameStatus {
  NOT_STARTED = "not-started",
  WAITING_FOR_SECOND_USER = "waiting-for-second-user",
  STARTED = "started",
  FINISHED = "finished",
}

export interface Player {
  id: string;
  color: string;
}

export type TBoard = Array<TRow>;

export type TRow = Array<string>;

export type TCell = string;

export interface IMove {
  row: number;
  side: ISide;
}

export type ISide = "left" | "right";

export interface IPositionInBoard {
  row: number;
  column: number;
}

// event interfaces
export interface IGameStateEvent {
  player: Player;
  gameState: IGameState;
}

export interface IErrorMessageEvent {
  errorMessage: string;
}
