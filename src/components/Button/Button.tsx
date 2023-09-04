import { ButtonStyledDiv } from "./styles";

interface IButtonProps {
  disabled: boolean;
  onClick: (...args: unknown[]) => void;
  children: React.ReactNode;
}

function Button({ disabled, onClick, children }: IButtonProps) {
  return (
    <ButtonStyledDiv disabled={disabled} onClick={onClick}>
      {children}
    </ButtonStyledDiv>
  );
}

export default Button;
