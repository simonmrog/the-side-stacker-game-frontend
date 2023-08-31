import React from "react";

import { StyledCell } from "./styles";
import { IPlayer } from "../../interfaces/player.interface";
import Player from "../Player/Player";

interface ICellProps {
  player: IPlayer;
}

function Cell({ player }: ICellProps) {
  return <StyledCell className="Cell">{player && <Player color={player.color} />}</StyledCell>;
}

export default Cell;
