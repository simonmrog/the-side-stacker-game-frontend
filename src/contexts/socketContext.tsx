import { useState, createContext } from "react";

import { ISocketContext, ISocketProviderProps } from "./socketContext.interface";

export const SocketContext = createContext<ISocketContext>({
  isConnected: false,
  error: null,
  setConnection: () => undefined,
  setError: () => undefined,
});

export function SocketProvider({ children }: ISocketProviderProps) {
  const [isConnected, setConnection] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <SocketContext.Provider value={{ isConnected, error, setConnection, setError }}>{children}</SocketContext.Provider>
  );
}
