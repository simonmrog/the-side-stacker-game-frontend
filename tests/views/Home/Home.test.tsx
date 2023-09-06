import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { GameStatus } from "../../../src/interfaces/game.interface";
import { ISocketContext } from "../../../src/contexts/socketContext.interface";
import { IGameContext } from "../../../src/contexts/gameContext.interface";
import { SocketContext } from "../../../src/contexts/socketContext";
import { GameContext } from "../../../src/contexts/gameContext";
import Home from "../../../src/views/Home/Home";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Home View tests", () => {
  afterEach(() => {
    cleanup();
  });

  function renderHome(socketContext: ISocketContext, gameContext: IGameContext) {
    return render(
      <SocketContext.Provider value={socketContext}>
        <GameContext.Provider value={gameContext}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </GameContext.Provider>
      </SocketContext.Provider>
    );
  }

  const fakeStateFunction = () => undefined;

  test("new game should navigate on click", () => {
    const socketContext: ISocketContext = {
      isConnected: false,
      eventOnHold: false,
      error: null,
      setConnection: fakeStateFunction,
      setEventOnHold: fakeStateFunction,
      setError: fakeStateFunction,
    };
    const gameContext: IGameContext = {
      player: { id: "some-id", name: "some-name", color: "some-color" },
      gameOnCourse: false,
      gameState: null,
      newGame: fakeStateFunction,
      setGameOnCourse: fakeStateFunction,
      restartGame: fakeStateFunction,
      joinGame: fakeStateFunction,
      dispatch: fakeStateFunction,
    };

    renderHome(socketContext, gameContext);
    const newGameButton = screen.getByTestId("home.new-game-button");

    fireEvent.click(newGameButton);

    expect(mockedNavigate).toBeCalled();
  });

  test("join game should navigate on click", () => {
    const socketContext: ISocketContext = {
      isConnected: true,
      eventOnHold: false,
      error: null,
      setConnection: fakeStateFunction,
      setEventOnHold: fakeStateFunction,
      setError: fakeStateFunction,
    };
    const gameContext: IGameContext = {
      player: { id: "some-id", name: "some-name", color: "some-color" },
      gameOnCourse: false,
      gameState: {
        status: GameStatus.WAITING_FOR_SECOND_USER,
        board: Array.from({ length: 7 }, () => Array(7).fill(null)),
        players: [],
        currentPlayer: null,
        moves: [],
        winnerId: null,
      },
      newGame: fakeStateFunction,
      setGameOnCourse: fakeStateFunction,
      restartGame: fakeStateFunction,
      joinGame: fakeStateFunction,
      dispatch: fakeStateFunction,
    };

    renderHome(socketContext, gameContext);
    const joinGameButton = screen.getByTestId("home.join-game-button");

    fireEvent.click(joinGameButton);

    expect(mockedNavigate).toBeCalled();
  });

  test("should show an error when is not connnected", () => {
    const socketContext: ISocketContext = {
      isConnected: false,
      eventOnHold: false,
      error: null,
      setConnection: fakeStateFunction,
      setEventOnHold: fakeStateFunction,
      setError: fakeStateFunction,
    };
    const gameContext: IGameContext = {
      player: { id: "some-id", name: "some-name", color: "some-color" },
      gameOnCourse: false,
      gameState: null,
      newGame: fakeStateFunction,
      setGameOnCourse: fakeStateFunction,
      restartGame: fakeStateFunction,
      joinGame: fakeStateFunction,
      dispatch: fakeStateFunction,
    };

    renderHome(socketContext, gameContext);
    const notConnectedMessage = screen.getByTestId("home.not-connected-message");

    expect(notConnectedMessage.innerHTML).toBe("Cannot connect to the server");
  });

  test("should show an error when is not connnected", () => {
    const socketContext: ISocketContext = {
      isConnected: false,
      eventOnHold: false,
      error: "some error",
      setConnection: fakeStateFunction,
      setEventOnHold: fakeStateFunction,
      setError: fakeStateFunction,
    };
    const gameContext: IGameContext = {
      player: { id: "some-id", name: "some-name", color: "some-color" },
      gameOnCourse: false,
      gameState: null,
      newGame: fakeStateFunction,
      setGameOnCourse: fakeStateFunction,
      restartGame: fakeStateFunction,
      joinGame: fakeStateFunction,
      dispatch: fakeStateFunction,
    };

    renderHome(socketContext, gameContext);
    const notConnectedMessage = screen.getByTestId("home.error-message");

    expect(notConnectedMessage.innerHTML).toBe("some error");
  });
});
