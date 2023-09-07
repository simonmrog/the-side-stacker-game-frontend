import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../src/services/socketService");

import { GameStatus } from "../src/interfaces/game.interface";
import { ISocketContext } from "../src/contexts/socketContext.interface";
import { IGameContext } from "../src/contexts/gameContext.interface";
import { SocketContext } from "../src/contexts/socketContext";
import { GameContext } from "../src/contexts/gameContext";

import socketService from "../src/services/socketService";

import App from "../src/App";

const fakeStateFunction = () => undefined;

const defaultContext = {
  socketContext: {
    isConnected: false,
    eventOnHold: false,
    error: null,
    setConnection: fakeStateFunction,
    setEventOnHold: fakeStateFunction,
    setError: fakeStateFunction,
  },
  gameContext: {
    player: { id: "some-id", name: "some-name", color: "some-color" },
    gameOnCourse: false,
    gameState: null,
    newGame: fakeStateFunction,
    setGameOnCourse: fakeStateFunction,
    restartGame: fakeStateFunction,
    joinGame: fakeStateFunction,
    dispatch: fakeStateFunction,
  },
};

describe("App component tests", () => {
  function renderApp(socketContext: ISocketContext, gameContext: IGameContext) {
    return render(
      <SocketContext.Provider value={socketContext}>
        <GameContext.Provider value={gameContext}>
          <App />
        </GameContext.Provider>
      </SocketContext.Provider>
    );
  }

  test("should call the socketService.connect method on render", () => {
    const connectSpy = jest.spyOn(socketService, "connect");

    renderApp(defaultContext.socketContext, defaultContext.gameContext);

    expect(connectSpy).toBeCalled();
  });

  test("should call the socketService.on method on render to handle events", () => {
    const eventHandlers = [
      "connect",
      "connecting",
      "connect_failed",
      "disconnect",
      "game-created",
      "game-busy",
      "game-restarted",
      "player-joined",
      "player-generated",
      "waiting-for-second-user",
      "player-moved",
      "game-finished",
      "game-disconnected",
      "exception",
    ];
    const onSpy = jest.spyOn(socketService, "on");

    renderApp(defaultContext.socketContext, defaultContext.gameContext);

    const calls = onSpy.mock.calls.map(args => args[0]);
    eventHandlers.forEach(handler => expect(calls).toContain(handler));
  });
});
