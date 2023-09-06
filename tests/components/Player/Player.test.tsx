import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Player from "../../../src/components/Player/Player";

describe("Player component tests", () => {
  test("should render a div", () => {
    render(<Player color="some-color" />);
    const playerDiv = screen.getByTestId("player");

    expect(playerDiv).toBeInTheDocument();
  });
});
