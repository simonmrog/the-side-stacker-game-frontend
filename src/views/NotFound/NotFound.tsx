import { useNavigate } from "react-router-dom";

import { StyledDiv } from "./styles";

function NotFound() {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <StyledDiv className="NotFound">
      <h1 data-testid="NotFound.Code">404</h1>
      <label data-testid="NotFound.Message">The page you are looking for does not exist</label>
      <br />
      <button data-testid="NotFound.Button" onClick={handleBackButton}>
        Go Back
      </button>
    </StyledDiv>
  );
}

export default NotFound;
