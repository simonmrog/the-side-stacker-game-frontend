import React from "react";

import { StyledCell } from "./styles";

interface ICellProps {
  value: string;
}

function Cell({ value }: ICellProps) {
  return <StyledCell className="Cell">{value || "x"}</StyledCell>;
}

export default Cell;
