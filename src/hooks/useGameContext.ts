import { useContext } from "react";

import { GameContext } from "../contexts/gameContext";

export const useGameContext = () => useContext(GameContext);
