import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Cell from "../../../src/components/StackerBoard/Cell";

describe("Cell component tests", () => {
  test("should render a div", () => {
    const player = { id: "some-id", name: "some-name", color: "some-color" };
    render(<Cell player={player} />);
    const cellDiv = screen.getByTestId("cell");

    expect(cellDiv).toBeInTheDocument();
  });
});
