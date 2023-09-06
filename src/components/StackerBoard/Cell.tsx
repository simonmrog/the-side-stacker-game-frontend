import { CellStyled } from "./styles";

import { IPlayer } from "../../interfaces/player.interface";

import Player from "../Player/Player";

interface ICellProps {
  player: IPlayer;
}

function Cell({ player }: ICellProps) {
  return (
    <CellStyled data-testid="cell" className="cell">
      {player && <Player color={player.color} />}
    </CellStyled>
  );
}

export default Cell;
