import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { GameStatus } from "../../../src/interfaces/game.interface";
import { ISocketContext } from "../../../src/contexts/socketContext.interface";
import { IGameContext } from "../../../src/contexts/gameContext.interface";
import { SocketContext } from "../../../src/contexts/socketContext";
import { GameContext } from "../../../src/contexts/gameContext";

import MovesBoard from "../../../src/components/MovesBoard/MovesBoard";

describe("MovesBoard component tests", () => {
  const fakeStateFunction = () => undefined;

  function renderMovesBoard(socketContext: ISocketContext, gameContext: IGameContext) {
    return render(
      <SocketContext.Provider value={socketContext}>
        <GameContext.Provider value={gameContext}>
          <MovesBoard />
        </GameContext.Provider>
      </SocketContext.Provider>
    );
  }

  test("should not render any move but the 'no moves' message when there are no moves", () => {
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

    renderMovesBoard(socketContext, gameContext);
    const noMovesMessage = screen.getByTestId("moves-board.no-moves");

    expect(noMovesMessage).toBeInTheDocument();

    try {
      screen.getAllByTestId("moves-board.move");
    } catch (err: unknown) {
      expect((err as Error).message).toContain('Unable to find an element by: [data-testid="moves-board.move"]');
    }
  });

  test("should render the same number of moves as the game state with the correct messages and not render the 'no moves' message", () => {
    const moves = ["Player 1 played (0, left)", "Player 2 played (1, right)", "Player 1 played (2, left)"];
    const expectedMovesMessages = [
      "1. Player 1 played (0, left)",
      "2. Player 2 played (1, right)",
      "3. Player 1 played (2, left)",
    ];
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
        status: GameStatus.STARTED,
        board: Array.from({ length: 7 }, () => Array(7).fill(null)),
        players: [],
        currentPlayer: null,
        moves,
        winnerId: null,
      },
      newGame: fakeStateFunction,
      setGameOnCourse: fakeStateFunction,
      restartGame: fakeStateFunction,
      joinGame: fakeStateFunction,
      dispatch: fakeStateFunction,
    };

    renderMovesBoard(socketContext, gameContext);
    const moveMessagesComponents = screen.getAllByTestId("moves-board.move");
    const moveMessages = moveMessagesComponents.map(move => move.innerHTML);

    expect(moveMessagesComponents.length).toEqual(moves.length);
    expect(moveMessages).toEqual(expectedMovesMessages);

    try {
      screen.getAllByTestId("moves-board.no-moves");
    } catch (err: unknown) {
      expect((err as Error).message).toContain('Unable to find an element by: [data-testid="moves-board.no-moves"]');
    }
  });
});
