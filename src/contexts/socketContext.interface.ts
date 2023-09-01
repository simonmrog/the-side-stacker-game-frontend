export interface ISocketContext {
  isConnected: boolean;
  error: string | null;
  setConnection: (value: boolean) => void;
  setError: (value: string | null) => void;
}

export interface ISocketProviderProps {
  children: React.ReactNode;
}
