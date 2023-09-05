import { CSSProperties } from "react";

import { ButtonStyledDiv } from "./styles";

interface IButtonProps {
  testId?: string;
  className?: string;
  style?: CSSProperties | undefined;
  disabled?: boolean;
  onClick: (...args: unknown[]) => void;
  children: React.ReactNode;
}

function Button({ testId, className, style, disabled, onClick, children }: IButtonProps) {
  return (
    <ButtonStyledDiv
      data-testid={testId}
      className={className}
      style={style}
      disabled={disabled ?? false}
      onClick={onClick}
    >
      {children}
    </ButtonStyledDiv>
  );
}

export default Button;
