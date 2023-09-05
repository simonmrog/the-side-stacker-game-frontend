import { useState, createContext } from "react";

import { ISocketContext, ISocketProviderProps } from "./socketContext.interface";

/*
  This context will handle the connection flags with the server
  and the errors
  */
export const SocketContext = createContext<ISocketContext>({
  isConnected: false,
  eventOnHold: false,
  error: null,
  setConnection: () => undefined,
  setEventOnHold: () => undefined,
  setError: () => undefined,
});

export function SocketProvider({ children }: ISocketProviderProps) {
  // Connected or not to the server
  const [isConnected, setConnection] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Manages the dead times between events
  const [eventOnHold, setEventOnHold] = useState<boolean>(false);

  return (
    <SocketContext.Provider value={{ isConnected, eventOnHold, error, setConnection, setEventOnHold, setError }}>
      {children}
    </SocketContext.Provider>
  );
}
