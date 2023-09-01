import styled from "styled-components";

interface StyledDivProps {
  color: string;
}

export const StyledDiv = styled.div<StyledDivProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;
