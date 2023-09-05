import styled from "styled-components";

import config from "../../config/config";

export const MovesBoardStyledWrapper = styled.div`
  background-color: ${config.STYLING.MOVES_BOARD_BACKGROUND_COLOR};
  border-radius: 8px;
  padding: 10px 20px;
  text-align: center;
  margin: 30px 0 20px 0;

  p {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 5px 10px 10px 10px;
  }
`;

export const MovesBoardStyledPanel = styled.div`
  background-color: white;
  padding: 12px 10px;
  border-radius: 5px;

  ul {
    list-style-type: none;
  }

  li {
    text-align: left;
    font-weight: bold;
    padding: 8px;
  }
`;
