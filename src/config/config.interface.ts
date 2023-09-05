export interface IConfig {
  ENV: string;
  BACKEND_URL: string;
  STYLING: IStylingConfig;
  MOVES_TO_SHOW: number;
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
  MOVES_BOARD_BACKGROUND_COLOR: string;
  BOARD_BACKGROUND_COLOR: string;
  PLAYER_SIZE_SM: string;
  PLAYER_SIZE_MD: string;
  PLAYER_SIZE_LG: string;
}
