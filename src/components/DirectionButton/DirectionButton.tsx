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
    <DirectionButtonStyledWrapper className={className} disabled={disabled} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </DirectionButtonStyledWrapper>
  );
}

export default DirectionButton;
