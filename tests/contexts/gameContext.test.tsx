import { useEffect, useContext } from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { GameStatus } from "../../src/interfaces/game.interface";
import { ReducerActions } from "../../src/contexts/gameContext.interface";
import { GameContext, GameProvider } from "../../src/contexts/gameContext";

jest.mock("../../src/services/socketService.ts");
import socketService from "../../src/services/socketService";

describe("GameProvider tests", () => {
  const playerToSet = { id: "some-id", name: "some-name", color: "some-color" };
  const gameToSet = {
    status: GameStatus.WAITING_FOR_SECOND_USER,
    board: Array.from({ length: 7 }, () => Array(7).fill(null)),
    players: [],
    currentPlayer: null,
    moves: [],
    winnerId: null,
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const TestingComponent = () => {
    const { player, gameState, gameOnCourse, setGameOnCourse, newGame, restartGame, joinGame, dispatch } =
      useContext(GameContext);

    useEffect(() => {
      setGameOnCourse(true);
      newGame();
      restartGame();
      joinGame();
      dispatch({
        type: ReducerActions.UPDATE_PLAYER_ID,
        payload: { player: playerToSet },
      });
      dispatch({
        type: ReducerActions.UPDATE_GAME,
        payload: { gameState: gameToSet },
      });
      //this does nothing with the state
      dispatch({
        type: "invalid-type",
        payload: {},
      });
    }, []);

    const playerString = player ? JSON.stringify(player) : "null";
    const gameStateString = gameState ? JSON.stringify(gameState) : "null";
    const gameOnCourseString = gameOnCourse ? "true" : "false";

    return (
      <>
        <p data-testid="testing-component-player">{playerString}</p>
        <p data-testid="testing-component-game-state">{gameStateString}</p>
        <p data-testid="testing-component-game-on-course">{gameOnCourseString}</p>
      </>
    );
  };

  test("should provide expected GameContext to child elements", () => {
    render(
      <GameProvider>
        <TestingComponent />
      </GameProvider>
    );
    const emitSpy = jest.spyOn(socketService, "emit");
    const expectedEmits = ["new-game", "restart-game", "join-game"];

    const player = screen.getByTestId("testing-component-player");
    const gameState = screen.getByTestId("testing-component-game-state");
    const gameOnCourseHold = screen.getByTestId("testing-component-game-on-course");

    expect(player.innerHTML).toBe(JSON.stringify(playerToSet));
    expect(gameState.innerHTML).toBe(JSON.stringify(gameToSet));
    expect(gameOnCourseHold.innerHTML).toBe("true");

    const calls = emitSpy.mock.calls.map(args => args[0]);
    expectedEmits.forEach(expected => expect(calls).toContain(expected));
  });
});
