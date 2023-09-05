import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { IPlayer } from "../../interfaces/player.interface";

import { PlayerTitleStyled } from "./styles";

interface IPlayerTitleProps {
  player: IPlayer | null | undefined;
}

function PlayerTitle({ player }: IPlayerTitleProps) {
  return (
    <PlayerTitleStyled className="player-title">
      <FontAwesomeIcon style={{ color: player?.color, fontSize: "1.5em", marginRight: "10px" }} icon={faUser} />
      {player?.name.toUpperCase()}
    </PlayerTitleStyled>
  );
}

export default PlayerTitle;
