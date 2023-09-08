export interface ISocketContext {
  isLoading: boolean;
  isConnected: boolean;
  eventOnHold: boolean;
  error: string | null;
  setLoading: (value: boolean) => void;
  setConnection: (value: boolean) => void;
  setEventOnHold: (value: boolean) => void;
  setError: (value: string | null) => void;
}

export interface ISocketProviderProps {
  children: React.ReactNode;
}
