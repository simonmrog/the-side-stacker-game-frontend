import styled from "styled-components";

export const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid yellow;
`;

export const StyledRow = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid yellow;
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

export const StyledCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 150px;
`;
