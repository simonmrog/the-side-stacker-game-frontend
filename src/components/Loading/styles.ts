import styled from "styled-components";

import config from "../../config/config";

export const LoadingStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: ${config.STYLING.TITLE_FONT_COLOR};
  height: 100%;
`;
