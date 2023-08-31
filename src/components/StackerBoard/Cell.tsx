import React from "react";

import { StyledCell } from "./styles";
import Player from "../Player/Player";

interface ICellProps {
  player: string;
}

function Cell({ player }: ICellProps) {
  return <StyledCell className="Cell">{player && <Player color={player.color} />}</StyledCell>;
}

export default Cell;
