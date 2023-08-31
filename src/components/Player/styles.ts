import styled from "styled-components";

interface StyledDivProps {
  color: string;
}

export const StyledDiv = styled.div<StyledDivProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  background: -webkit-radial-gradient(65% 15%, circle, white 1px, aqua 3%, darkblue 60%, aqua 100%);
  background: -moz-radial-gradient(65% 15%, circle, white 1px, aqua 3%, darkblue 60%, aqua 100%);
  background: -o-radial-gradient(65% 15%, circle, white 1px, aqua 3%, darkblue 60%, aqua 100%);
  background: radial-gradient(circle at 65% 15%, white 1px, aqua 3%, darkblue 60%, aqua 100%);
  background: ${props => props.color};
`;
