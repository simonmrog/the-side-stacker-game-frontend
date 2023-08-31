import React from "react";

import { StyledCell } from "./styles";
import Player from "../Player/Player";

interface ICellProps {
  value: string;
}

function Cell({ value }: ICellProps) {
  return <StyledCell className="Cell">{value && <Player />}</StyledCell>;
}

export default Cell;
