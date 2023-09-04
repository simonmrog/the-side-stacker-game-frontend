import styled from "styled-components";

import config from "../../config/config";

export const ButtonStyledDiv = styled.div<{ disabled?: boolean }>`
  display: inline-block;
  padding: 20px 60px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 2rem;
  background-color: ${props =>
    props.disabled ? config.STYLING.BUTTON_DISABLED_BACKGROUND_COLOR : config.STYLING.BUTTON_BACKGROUND_COLOR};
  color: ${config.STYLING.BUTTON_FONT_COLOR};
  box-shadow: 4px 5px 5px
    ${props => (props.disabled ? config.STYLING.BUTTON_DISABLED_SHADOW_COLOR : config.STYLING.BUTTON_SHADOW_COLOR)};

  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};

  &:hover {
    background-color: ${config.STYLING.BUTTON_HOVER_BACKGROUND_COLOR};
    box-shadow: 4px 5px 5px ${config.STYLING.BUTTON_HOVER_SHADOW_COLOR};
  }
`;
