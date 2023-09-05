import styled from "styled-components";

import config from "../../config/config";

export const HomeStyledErrorMessage = styled.div`
  color: ${config.STYLING.ERROR_FONT_COLOR};
  font-weight: 900;
  font-size: 1.5em;
  margin-top: 20px;
`;

export const HomeStyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  .home-content-wrapper {
    text-align: center;
  }

  .home-title {
    color: ${config.STYLING.TITLE_FONT_COLOR};
    margin-bottom: 20px;
    font-weight: 900;

    @media screen and (max-width: 767px) {
      font-size: 40px;
    }

    @media screen and (max-width: 991px) {
      font-size: 50px;
    }

    @media screen and (min-width: 992px) {
      font-size: 80px;
    }
  }
`;
