import React from "react";

import { CellStyled } from "./styles";

import { IPlayer } from "../../interfaces/player.interface";

import Player from "../Player/Player";

interface ICellProps {
  player: IPlayer;
}

function Cell({ player }: ICellProps) {
  return <CellStyled className="cell">{player && <Player color={player.color} />}</CellStyled>;
}

export default Cell;
