import { BrowserRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { GameStatus } from "../../../src/interfaces/game.interface";
import { ISocketContext } from "../../../src/contexts/socketContext.interface";
import { IGameContext } from "../../../src/contexts/gameContext.interface";
import { SocketContext } from "../../../src/contexts/socketContext";
import { GameContext } from "../../../src/contexts/gameContext";

import Board from "../../../src/components/StackerBoard/Board";

describe("Board component tests", () => {
  function renderBoard(socketContext: ISocketContext, gameContext: IGameContext) {
    return render(
      <SocketContext.Provider value={socketContext}>
        <GameContext.Provider value={gameContext}>
          <BrowserRouter>
            <Board />
          </BrowserRouter>
        </GameContext.Provider>
      </SocketContext.Provider>
    );
  }

  const fakeStateFunction = () => undefined;

  test("should not create any row when the game has not started", () => {
    try {
      const socketContext: ISocketContext = {
        isLoading: false,
        isConnected: false,
        eventOnHold: false,
        error: null,
        setLoading: fakeStateFunction,
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

      renderBoard(socketContext, gameContext);

      screen.getAllByTestId("board.row");
    } catch (err) {
      expect((err as Error).message).toContain('Unable to find an element by: [data-testid="board.row"]');
    }
  });

  test("should create rows equal to the length of the board", () => {
    const boardRows = 7;
    const socketContext: ISocketContext = {
      isLoading: false,
      isConnected: false,
      eventOnHold: false,
      error: null,
      setLoading: fakeStateFunction,
      setConnection: fakeStateFunction,
      setEventOnHold: fakeStateFunction,
      setError: fakeStateFunction,
    };
    const gameContext: IGameContext = {
      player: { id: "some-id", name: "some-name", color: "some-color" },
      gameOnCourse: false,
      gameState: {
        status: GameStatus.STARTED,
        board: Array.from({ length: boardRows }, () => Array(boardRows).fill(null)),
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

    renderBoard(socketContext, gameContext);
    const rows = screen.getAllByTestId("row");

    expect(rows.length).toEqual(boardRows);
  });
});
