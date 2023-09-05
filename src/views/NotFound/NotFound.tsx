import { useNavigate } from "react-router-dom";

import { StyledDiv } from "./styles";
import Button from "../../components/Button/Button";

function NotFound() {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <StyledDiv className="not-found">
      <div data-testid="not-found.code" className="not-found-404-message">
        404
      </div>
      <label data-testid="not-found.message">The page you are looking for does not exist</label>
      <br />
      <Button testId="not-found.button" onClick={handleBackButton}>
        Go Back
      </Button>
    </StyledDiv>
  );
}

export default NotFound;
