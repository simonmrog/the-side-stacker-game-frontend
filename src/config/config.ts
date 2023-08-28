import { IConfig } from "./config.interface";

function configFactory(): IConfig {
  return {
    ENV: process.env.NODE_ENV ?? "dev",
    BACKEND_URL: process.env.REACT_APP_BACKEND_URL ?? "http://localhost:4200",
  };
}

export default configFactory();
