import React from "react";

import { TBoard } from "../../interfaces/sideStacker.interface";
import Board from "./Board";

interface ISideStackerProps {
  board: TBoard;
}

function SideStacker({ board }: ISideStackerProps) {
  return (
    <div>
      <h1>Board</h1>
      <Board board={board} />
    </div>
  );
}

export default SideStacker;
