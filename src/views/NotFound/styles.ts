import styled from "styled-components";

import config from "../../config/config";

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  color: ${config.STYLING.TITLE_FONT_COLOR};

  .not-found-404-message {
    font-size: 5em;
    font-size: bold;
  }
`;
