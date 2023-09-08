import { useState, createContext } from "react";

import { ISocketContext, ISocketProviderProps } from "./socketContext.interface";

/*
  This context will handle the connection flags with the server
  and the errors
  */
export const SocketContext = createContext<ISocketContext>({
  isLoading: false,
  isConnected: false,
  eventOnHold: false,
  error: null,
  setLoading: () => undefined,
  setConnection: () => undefined,
  setEventOnHold: () => undefined,
  setError: () => undefined,
});

export function SocketProvider({ children }: ISocketProviderProps) {
  // State to control the dead times between database operations
  const [isLoading, setLoading] = useState<boolean>(false);
  // Connected or not to the server
  const [isConnected, setConnection] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Manages dead times between events
  const [eventOnHold, setEventOnHold] = useState<boolean>(false);

  return (
    <SocketContext.Provider
      value={{ isLoading, isConnected, eventOnHold, error, setLoading, setConnection, setEventOnHold, setError }}
    >
      {children}
    </SocketContext.Provider>
  );
}
