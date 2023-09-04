import { IConfig } from "./config.interface";

function configFactory(): IConfig {
  return {
    ENV: process.env.NODE_ENV ?? "dev",
    BACKEND_URL: process.env.REACT_APP_BACKEND_URL ?? "http://localhost:4200",
    STYLING: {
      ERROR_FONT_COLOR: "#f16445",
      TITLE_FONT_COLOR: "#3972bf",
      BUTTON_BACKGROUND_COLOR: "#7dbf5e",
      BUTTON_HOVER_BACKGROUND_COLOR: "#f5c736",
      BUTTON_FONT_COLOR: "#fff",
      BUTTON_SHADOW_COLOR: "#829a61",
      BUTTON_HOVER_SHADOW_COLOR: "#ac9f64",
      BUTTON_DISABLED_BACKGROUND_COLOR: "#696969",
      BUTTON_DISABLED_SHADOW_COLOR: "#a9a9a9",
    },
  };
}

export default configFactory();
