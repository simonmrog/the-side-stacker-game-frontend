import { useEffect } from "react";

import socketService from "./services/socketService";

function App() {
  useEffect(() => {
    socketService.connect();

    socketService.on("player-connected", players => {
      console.log("[player-connected event]: ", players);
    });

    return () => {
      socketService.disconnect();
      socketService.off("player-connected");
    };
  }, []);

  return <div className="App">The Side Stacker Game</div>;
}

export default App;
