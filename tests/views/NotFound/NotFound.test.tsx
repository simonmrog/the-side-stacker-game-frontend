import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import NotFound from "../../../src/views/NotFound/NotFound";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("NotFound View tests", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
  });

  test("should show the correct error message", () => {
    const codeElement = screen.getByTestId("not-found.code");
    const messageElement = screen.getByTestId("not-found.message");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.innerHTML).toBe("404");
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.innerHTML).toBe("The page you are looking for does not exist");
  });

  test("should render the back button", () => {
    const backButton = screen.getByTestId("not-found.button");
    const backButtonText = backButton.innerHTML;
    expect(backButton).toBeInTheDocument();
    expect(backButtonText).toContain("Go Back");
  });

  test("back button should navigate on click", () => {
    const backButton = screen.getByTestId("not-found.button");
    fireEvent.click(backButton);
    expect(mockedNavigate).toBeCalled();
  });
});
