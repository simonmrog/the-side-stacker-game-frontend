import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { GameStatus } from "../../../src/interfaces/game.interface";
import { ISocketContext } from "../../../src/contexts/socketContext.interface";
import { IGameContext } from "../../../src/contexts/gameContext.interface";
import { SocketContext } from "../../../src/contexts/socketContext";
import { GameContext } from "../../../src/contexts/gameContext";

import GameBoard from "../../../src/views/GameBoard/GameBoard";

// Mock the navigate function to validate if the redirection is done
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Mock the socket service to spy on the getId method
jest.mock("../../../src/services/socketService");
import socketService from "../../../src/services/socketService";

describe("GameBoard view tests", () => {
  // We mock the state functions to be able to spy on them
  const fakeStateFunction = jest.fn();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function renderGameBoard(socketContext: ISocketContext, gameContext: IGameContext) {
    return render(
      <SocketContext.Provider value={socketContext}>
        <GameContext.Provider value={gameContext}>
          <GameBoard />
        </GameContext.Provider>
      </SocketContext.Provider>
    );
  }

  test("should redirect to home if there is no game on course", () => {
    const socketContext: ISocketContext = {
      isConnected: false,
      eventOnHold: false,
      error: null,
      setConnection: fakeStateFunction,
      setEventOnHold: fakeStateFunction,
      setError: fakeStateFunction,
    };
    const gameContext: IGameContext = {
      player: null,
      gameOnCourse: false,
      gameState: null,
      newGame: fakeStateFunction,
      setGameOnCourse: fakeStateFunction,
      restartGame: fakeStateFunction,
      joinGame: fakeStateFunction,
      dispatch: fakeStateFunction,
    };

    renderGameBoard(socketContext, gameContext);

    expect(mockedNavigate).toBeCalledWith("/");
  });

  test("should set event on hold and restart the game when the 'restart' button is pressed", () => {
    const socketContext: ISocketContext = {
      isConnected: true,
      eventOnHold: false,
      error: null,
      setConnection: fakeStateFunction,
      setEventOnHold: fakeStateFunction,
      setError: fakeStateFunction,
    };
    const gameContext: IGameContext = {
      player: { id: "some-id-2", name: "Player 2", color: "blue" },
      gameOnCourse: true,
      gameState: {
        status: GameStatus.STARTED,
        board: Array.from({ length: 7 }, () => Array(7).fill(null)),
        players: [
          { id: "some-id-1", name: "Player 1", color: "red" },
          {
            id: "some-id-2",
            name: "Player 2",
            color: "blue",
          },
        ],
        currentPlayer: "some-id-2",
        moves: [],
        winnerId: null,
      },
      newGame: fakeStateFunction,
      setGameOnCourse: fakeStateFunction,
      restartGame: fakeStateFunction,
      joinGame: fakeStateFunction,
      dispatch: fakeStateFunction,
    };

    renderGameBoard(socketContext, gameContext);
    const restartButton = screen.getByTestId("game-board.restart-button");

    fireEvent.click(restartButton);

    expect(socketContext.setEventOnHold).toBeCalledWith(true);
    expect(gameContext.restartGame).toBeCalled();
  });

  test("should show the waiting message when the state of the game is WAITING_FOR_SECOND_USER", () => {
    const socketContext: ISocketContext = {
      isConnected: true,
      eventOnHold: false,
      error: null,
      setConnection: fakeStateFunction,
      setEventOnHold: fakeStateFunction,
      setError: fakeStateFunction,
    };
    const gameContext: IGameContext = {
      player: { id: "some-id-1", name: "Player 1", color: "red" },
      gameOnCourse: true,
      gameState: {
        status: GameStatus.WAITING_FOR_SECOND_USER,
        board: Array.from({ length: 7 }, () => Array(7).fill(null)),
        players: [{ id: "some-id-1", name: "Player 1", color: "red" }],
        currentPlayer: "some-id-1",
        moves: [],
        winnerId: null,
      },
      newGame: fakeStateFunction,
      setGameOnCourse: fakeStateFunction,
      restartGame: fakeStateFunction,
      joinGame: fakeStateFunction,
      dispatch: fakeStateFunction,
    };
    jest.spyOn(socketService, "getId").mockImplementation(() => "some-id-1");

    renderGameBoard(socketContext, gameContext);
    const waitingMessage = screen.getByTestId("game-board.waiting-message");

    expect(waitingMessage.innerHTML).toBe("Waiting for someone to join the game...");
  });

  test("should show the result message when the winnerId is set", () => {
    const socketContext: ISocketContext = {
      isConnected: true,
      eventOnHold: false,
      error: null,
      setConnection: fakeStateFunction,
      setEventOnHold: fakeStateFunction,
      setError: fakeStateFunction,
    };
    const gameContext: IGameContext = {
      player: { id: "some-id-1", name: "Player 1", color: "red" },
      gameOnCourse: true,
      gameState: {
        status: GameStatus.FINISHED,
        board: Array.from({ length: 7 }, () => Array(7).fill(null)),
        players: [
          { id: "some-id-1", name: "Player 1", color: "red" },
          { id: "some-id-2", name: "Player 2", color: "blue" },
        ],
        currentPlayer: "some-id-1",
        moves: [],
        winnerId: "some-id-1",
      },
      newGame: fakeStateFunction,
      setGameOnCourse: fakeStateFunction,
      restartGame: fakeStateFunction,
      joinGame: fakeStateFunction,
      dispatch: fakeStateFunction,
    };

    renderGameBoard(socketContext, gameContext);
    const resultMessage = screen.getByTestId("game-board.result-message");

    expect(resultMessage.innerHTML).toBe("Player 1 won");
  });
});
