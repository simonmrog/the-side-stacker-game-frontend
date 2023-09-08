import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Loading from "../../../src/components/Loading/Loading";

describe("Loading component tests", () => {
  test("should render the component and show the loading message", () => {
    render(<Loading />);
    const loadingDiv = screen.getByTestId("loading");

    expect(loadingDiv).toBeInTheDocument();
    expect(loadingDiv.innerHTML).toContain("Loading...");
  });
});
