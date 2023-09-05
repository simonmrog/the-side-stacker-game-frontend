import styled from "styled-components";

import config from "../../config/config";

export const BoardStyledWrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  background-color: ${config.STYLING.BOARD_BACKGROUND_COLOR};
  max-width: 100%;

  @media screen and (min-width: 768px) {
    max-width: 530px;
  }
`;

export const StyledRow = styled.div`
  display: flex;
  padding: 0 20px;
  width: 100%;
  justify-content: center;
  align-items: center;

  .row-left-button {
    margin-right: 20px;
  }

  .row-right-button {
    margin-left: 20px;
  }
`;

export const CellStyled = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(${config.STYLING.PLAYER_SIZE_SM} + 5px);
  min-width: calc(${config.STYLING.PLAYER_SIZE_SM} + 5px);
  border: 0.5px solid grey;
  padding: 1px;

  @media (min-width: 768px) {
    min-height: calc(${config.STYLING.PLAYER_SIZE_MD} + 5px);
    min-width: calc(${config.STYLING.PLAYER_SIZE_MD} + 5px);
  }
`;
