import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { IPlayer } from "../../interfaces/player.interface";

import { PlayerTitleStyled } from "./styles";

interface IPlayerTitleProps {
  player: IPlayer | null | undefined;
}

function PlayerTitle({ player }: IPlayerTitleProps) {
  return (
    <PlayerTitleStyled data-testid="player-title" className="player-title">
      <FontAwesomeIcon
        data-testid="player-title.icon"
        style={{ color: player?.color, fontSize: "1.5em", marginRight: "10px" }}
        icon={faUser}
      />
      <label data-testid="player-title.label">{player?.name.toUpperCase()}</label>
    </PlayerTitleStyled>
  );
}

export default PlayerTitle;
