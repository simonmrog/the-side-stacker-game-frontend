import { StyledDiv } from "./styles";

interface IPlayerProps {
  color: string;
}

function Player({ color }: IPlayerProps) {
  return <StyledDiv data-testid="player" color={color}></StyledDiv>;
}

export default Player;
