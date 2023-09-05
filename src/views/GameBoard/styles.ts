import styled from "styled-components";

import config from "../../config/config";

export const GameBoardStyledWrapper = styled.div`
  padding: 30px 18px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: start;

  .game-board-title {
    margin-top: 15px;
    color: ${config.STYLING.TITLE_FONT_COLOR};
    text-align: end;
  }

  .game-board-waiting-message {
    color: ${config.STYLING.TITLE_FONT_COLOR};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-weight: bold;
  }

  .game-board-no-game-oncourse {
    color: ${config.STYLING.TITLE_FONT_COLOR};
  }
`;

export const GameBoardStyledContent = styled.div`
  max-width: 100%;

  .player-title {
    margin-top: 40px;
  }
`;

export const StyledResultMessage = styled.div`
  background-color: grey;
`;
