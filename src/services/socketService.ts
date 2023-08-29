import { io } from "socket.io-client";

import config from "../config/config";

class SocketService {
  private socket;

  constructor() {
    this.socket = io(config.BACKEND_URL, { autoConnect: false });
  }

  getId(): string {
    return this.socket.id;
  }

  isConnected(): boolean {
    return this.socket.connected;
  }

  on(key: string, callback: (...args: unknown[]) => void): void {
    this.socket.on(key, callback);
  }

  off(key: string, callback?: (...args: unknown[]) => void): void {
    this.socket.off(key, callback);
  }

  emit(key: string, payload?: unknown): void {
    this.socket.emit(key, payload);
  }

  connect(): void {
    this.socket.connect();
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}

export default new SocketService();
