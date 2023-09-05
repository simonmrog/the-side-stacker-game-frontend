import styled from "styled-components";

import config from "../../config/config";

export const DirectionButtonStyledWrapper = styled.div<{ disabled?: boolean }>`
  display: inline-block;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  background-color: ${props =>
    props.disabled ? config.STYLING.BUTTON_DISABLED_BACKGROUND_COLOR : config.STYLING.BUTTON_BACKGROUND_COLOR};
  color: ${config.STYLING.BUTTON_FONT_COLOR};

  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};

  &:hover {
    background-color: ${config.STYLING.BUTTON_HOVER_BACKGROUND_COLOR};
  }
`;
