import { useContext } from "react";

import { SocketContext } from "../contexts/socketContext";

export const useSocketContext = () => useContext(SocketContext);
