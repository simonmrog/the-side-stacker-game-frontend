import styled from "styled-components";

import config from "../../config/config";

interface StyledDivProps {
  color: string;
}

export const StyledDiv = styled.div<StyledDivProps>`
  width: ${config.STYLING.PLAYER_SIZE};
  height: ${config.STYLING.PLAYER_SIZE};
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 2px 2px 4px black;
`;
