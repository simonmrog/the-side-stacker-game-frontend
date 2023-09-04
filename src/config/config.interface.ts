export interface IConfig {
  ENV: string;
  BACKEND_URL: string;
  STYLING: IStylingConfig;
}

export interface IStylingConfig {
  ERROR_FONT_COLOR: string;
  TITLE_FONT_COLOR: string;
  BUTTON_BACKGROUND_COLOR: string;
  BUTTON_HOVER_BACKGROUND_COLOR: string;
  BUTTON_FONT_COLOR: string;
  BUTTON_SHADOW_COLOR: string;
  BUTTON_HOVER_SHADOW_COLOR: string;
  BUTTON_DISABLED_BACKGROUND_COLOR: string;
  BUTTON_DISABLED_SHADOW_COLOR: string;
}
