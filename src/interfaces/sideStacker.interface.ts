export interface IGame {
  start(): void;
  endGame(result: string): void;
  handleTurn(player: string, move: IMove): void;
  checkForDraw(): boolean;
  checkForWin(player: string, row: number, column: number): boolean;
}

export interface IGameState {
  status: GameStatus;
  board: TBoard;
  players: Array<string>;
  currentPlayer: string | null;
  moves: Array<string>;
  winnerId: string | null;
}

export enum GameStatus {
  NOT_STARTED = "not-started",
  WAITING_FOR_SECOND_USER = "waiting-for-second-user",
  STARTED = "started",
  FINISHED = "finished",
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

export interface IGameStateEvent {
  playerId: string;
  gameState: IGameState;
}
