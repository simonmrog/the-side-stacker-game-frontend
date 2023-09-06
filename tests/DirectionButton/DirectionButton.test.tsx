import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import DirectionButton from "../../src/components/DirectionButton/DirectionButton";

describe("DirectionButton component tests", () => {
  test("should render a div with a font-awesome component", () => {
    render(<DirectionButton direction="left" disabled={false} onClick={() => undefined} />);

    const buttonDiv = screen.getByTestId("direction-button");
    const iconComponent = screen.getByTestId("direction-button.icon");

    expect(buttonDiv).toBeInTheDocument();
    expect(iconComponent).toBeInTheDocument();
  });
});
