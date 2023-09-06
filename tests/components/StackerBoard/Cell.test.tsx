import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Cell from "../../../src/components/StackerBoard/Cell";

describe("Cell component tests", () => {
  test("should render a div and without a player component when the player is null", () => {
    try {
      render(<Cell player={null} />);

      const cellDiv = screen.getByTestId("cell");
      expect(cellDiv).toBeInTheDocument();

      screen.getByTestId("player");
    } catch (err: unknown) {
      expect((err as Error).message).toContain('Unable to find an element by: [data-testid="player"]');
    }
  });

  test("should render a div and a player component when the player exists", () => {
    const player = { id: "some-id", name: "some-name", color: "some-color" };
    render(<Cell player={player} />);
    const cellDiv = screen.getByTestId("cell");
    const playerDiv = screen.getByTestId("player");

    expect(cellDiv).toBeInTheDocument();
    expect(playerDiv).toBeInTheDocument();
  });
});
