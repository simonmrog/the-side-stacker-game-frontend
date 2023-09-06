import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import PlayerTitle from "../../../src/components/PlayerTitle/PlayerTitle";

describe("PlayerTitle component tests", () => {
  test("should render a div with a font-awesome component and a label", () => {
    const player = { id: "some-id", name: "some-name", color: "some-color" };
    render(<PlayerTitle player={player} />);

    const playerTitleDiv = screen.getByTestId("player-title");
    const iconComponent = screen.getByTestId("player-title.icon");
    const label = screen.getByTestId("player-title.label");

    expect(playerTitleDiv).toBeInTheDocument();
    expect(iconComponent).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
