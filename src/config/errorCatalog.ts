import { IErrorCatalog } from "./errorCatalog.interface";

export const errorCatalog: IErrorCatalog = {
  GAME_BUSY: "Game is busy right now, try again later",
  GAME_DISCONNECTED: "Game was disconnected due to lack of players",
  SERVER_ERROR: "Cannot connect to the server",
};
