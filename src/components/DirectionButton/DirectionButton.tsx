import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { DirectionButtonStyledWrapper } from "./styles";

interface IDirectionButtonProps {
  className?: string;
  direction: string;
  disabled: boolean;
  onClick: (...args: unknown[]) => void;
}

function DirectionButton({ className, direction, disabled, onClick }: IDirectionButtonProps) {
  const icon = direction === "left" ? faCaretLeft : faCaretRight;

  return (
    <DirectionButtonStyledWrapper
      data-testid="direction-button"
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      <FontAwesomeIcon data-testid="direction-button.icon" icon={icon} />
    </DirectionButtonStyledWrapper>
  );
}

export default DirectionButton;
