import React from "react";
import { useEffect } from "react";

import socketService from "./services/socketService";

function App() {
  useEffect(() => {
    socketService.connect();

    socketService.on("player-connected", players => {
      console.log("[player-connected event]: ", players);
    });

    socketService.on("message", (message: unknown) => {
      console.log("[message event]: ", message);
      socketService.emit("message-response", "hello");
    });

    socketService.on("random-message", (message: unknown) => {
      console.log("[random-message event]: ", message);
    });

    return () => {
      socketService.disconnect();
      socketService.off("player-connected");
      socketService.off("message");
      socketService.off("random-message");
    };
  }, []);

  return <div className="App">The Side Stacker Game</div>;
}

export default App;
