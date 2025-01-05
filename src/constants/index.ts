export const APP_NAME = 'HomeAI';

export const STORAGE_KEYS = {
  USER_PREFERENCES: '@homeai/user-preferences',
  AUTH_TOKEN: '@homeai/auth-token',
  DEVICE_SETTINGS: '@homeai/device-settings',
};

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.homeai.com',
  AI_SERVICE: '/ai',
  SMART_HOME: '/devices',
  USER: '/user',
};

export const THEME_CONSTANTS = {
  HEADER_HEIGHT: 56,
  BOTTOM_TAB_HEIGHT: 64,
  CARD_BORDER_RADIUS: 12,
};

export default {
  APP_NAME,
  STORAGE_KEYS,
  API_ENDPOINTS,
  THEME_CONSTANTS,
}; 