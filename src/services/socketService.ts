import { io } from "socket.io-client";

import config from "../config/config";

class SocketService {
  private socket;

  constructor() {
    this.socket = io(config.BACKEND_URL, { autoConnect: false });

    this.socket.on("connect", () => {
      console.log("Socket connection established");
    });

    this.socket.on("disconnect", () => {
      console.log("Socket connection dismissed");
    });

    this.socket.on("player-connected", players => {
      console.log("[player-connected event]: ", players);
    });

    this.socket.on("message", (message: unknown) => {
      console.log("[message event]: ", message);
      this.socket.emit("message-response", "hello");
    });

    this.socket.on("random-message", (message: unknown) => {
      console.log("[random-message event]: ", message);
    });
  }

  on(key: string, callback: (...args: unknown[]) => void): void {
    this.socket.on(key, callback);
  }

  off(key: string, callback?: (...args: unknown[]) => void): void {
    this.socket.off(key, callback);
  }

  emit(key: string, payload: unknown): void {
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
