import { CSSProperties } from "react";

import { ButtonStyledDiv } from "./styles";

interface IButtonProps {
  className?: string;
  style?: CSSProperties | undefined;
  disabled?: boolean;
  onClick: (...args: unknown[]) => void;
  children: React.ReactNode;
}

function Button({ className, style, disabled, onClick, children }: IButtonProps) {
  return (
    <ButtonStyledDiv className={className} style={style} disabled={disabled ?? false} onClick={onClick}>
      {children}
    </ButtonStyledDiv>
  );
}

export default Button;
