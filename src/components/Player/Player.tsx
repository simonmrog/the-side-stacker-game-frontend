import React from "react";

import { StyledDiv } from "./styles";

interface IPlayerProps {
  color: string;
}

function Player({ color }: IPlayerProps) {
  console.log(color);
  return <StyledDiv color={color}></StyledDiv>;
}

export default Player;
