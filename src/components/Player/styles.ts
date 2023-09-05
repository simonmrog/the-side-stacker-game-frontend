import styled from "styled-components";

import config from "../../config/config";

interface StyledDivProps {
  color: string;
}

export const StyledDiv = styled.div<StyledDivProps>`
  width: ${config.STYLING.PLAYER_SIZE_SM};
  height: ${config.STYLING.PLAYER_SIZE_SM};
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 2px 2px 4px black;

  @media (min-width: 768px) {
    min-height: calc(${config.STYLING.PLAYER_SIZE_MD});
    min-width: calc(${config.STYLING.PLAYER_SIZE_MD});
  }
`;
