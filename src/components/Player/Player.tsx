import React from "react";

import { StyledDiv } from "./styles";
import { useGameContext } from "../../hooks/useGameContext";

function Player() {
  const { player } = useGameContext();

  return <StyledDiv color={player!.color}></StyledDiv>;
}

export default Player;
