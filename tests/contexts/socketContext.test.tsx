import { useEffect, useContext } from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SocketContext, SocketProvider } from "../../src/contexts/socketContext";

describe("SocketProvider tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const TestingComponent = () => {
    const { isConnected, error, eventOnHold, setConnection, setError, setEventOnHold } = useContext(SocketContext);

    useEffect(() => {
      setConnection(true);
      setError("some-error");
      setEventOnHold(true);
    });

    const isConnectedString = isConnected ? "true" : "false";
    const errorString = error ?? "null";
    const eventOnHoldString = eventOnHold ? "true" : "false";

    return (
      <>
        <p data-testid="testing-component-is-connected">{isConnectedString}</p>
        <p data-testid="testing-component-error">{errorString}</p>
        <p data-testid="testing-component-event-on-hold">{eventOnHoldString}</p>
      </>
    );
  };

  test("should provide expected SocketContext to child elements", () => {
    render(
      <SocketProvider>
        <TestingComponent />
      </SocketProvider>
    );

    const isConnected = screen.getByTestId("testing-component-is-connected");
    const error = screen.getByTestId("testing-component-error");
    const eventOnHold = screen.getByTestId("testing-component-event-on-hold");

    expect(isConnected.innerHTML).toBe("true");
    expect(error.innerHTML).toBe("some-error");
    expect(eventOnHold.innerHTML).toBe("true");
  });
});
