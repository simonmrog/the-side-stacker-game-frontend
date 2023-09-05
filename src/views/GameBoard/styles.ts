import styled from "styled-components";

import config from "../../config/config";

export const GameBoardStyledWrapper = styled.div`
  padding: 30px 18px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .game-board-title {
    width: 100%;
    margin-top: 15px;
    color: ${config.STYLING.TITLE_FONT_COLOR};
    text-align: right;

    @media screen and (min-width: 768px) {
      font-size: 1.5rem;
      text-align: center;
    }
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
    margin-top: 20px;
    text-align: right;

    @media screen and (min-width: 768px) {
      margin-top: 50px;
    }
  }

  @media screen and (min-width: 768px) {
    max-width: 550px;
  }

  @media screen and (min-width: 1200px) {
    margin-top: 60px;
    max-width: 1000px;
    display: flex;
    flex-wrap: wrap;

    .player-title {
      max-width: 530px;
      margin-top: 0;
    }

    .game-board-game-wrapper {
      flex-basis: 60%;
      margin-right: 20px;
    }

    .board {
      margin-right: 0;
    }

    .moves-board-wrapper {
      flex-basis: 30%;
      margin-top: 0;
      margin-bottom: 0px;
    }

    .game-board-restart-button-wrapper {
      display: block;
    }
  }
`;

export const StyledResultMessage = styled.div`
  background-color: grey;
`;
