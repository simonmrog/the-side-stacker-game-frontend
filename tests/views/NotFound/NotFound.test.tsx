import React from "react";
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
    const codeElement = screen.getByTestId("NotFound.Code");
    const messageElement = screen.getByTestId("NotFound.Message");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.innerHTML).toBe("404");
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.innerHTML).toBe("The page you are looking for does not exist");
  });

  test("should render the back button", () => {
    const backButton = screen.getByTestId("NotFound.Button");
    const backButtonText = backButton.innerHTML;
    expect(backButton).toBeInTheDocument();
    expect(backButtonText).toContain("Go Back");
  });

  test("back button should navigate on click", () => {
    const backButton = screen.getByTestId("NotFound.Button");
    fireEvent.click(backButton);
    expect(mockedNavigate).toBeCalled();
  });
});
