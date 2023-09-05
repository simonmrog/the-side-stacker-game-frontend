export interface ISocketContext {
  isConnected: boolean;
  eventOnHold: boolean;
  error: string | null;
  setConnection: (value: boolean) => void;
  setEventOnHold: (value: boolean) => void;
  setError: (value: string | null) => void;
}

export interface ISocketProviderProps {
  children: React.ReactNode;
}
