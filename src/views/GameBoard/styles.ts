import styled from "styled-components";

import config from "../../config/config";

export const GameBoardStyledWrapper = styled.div`
  padding: 30px 18px;

  .player-title {
    margin-top: 40px;
  }

  .game-board-title {
    margin-top: 15px;
    color: ${config.STYLING.TITLE_FONT_COLOR};
    text-align: end;
  }

  .board {
    margin-bottom; 20px;
  }
`;

export const StyledResultMessage = styled.div`
  background-color: grey;
`;
