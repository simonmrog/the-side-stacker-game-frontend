import { useState, createContext } from "react";

import { ISocketContext, ISocketProviderProps } from "./socketContext.interface";

export const SocketContext = createContext<ISocketContext>({
  isConnected: false,
  eventOnHold: false,
  error: null,
  setConnection: () => undefined,
  setEventOnHold: () => undefined,
  setError: () => undefined,
});

export function SocketProvider({ children }: ISocketProviderProps) {
  const [isConnected, setConnection] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [eventOnHold, setEventOnHold] = useState<boolean>(false);

  return (
    <SocketContext.Provider value={{ isConnected, eventOnHold, error, setConnection, setEventOnHold, setError }}>
      {children}
    </SocketContext.Provider>
  );
}
