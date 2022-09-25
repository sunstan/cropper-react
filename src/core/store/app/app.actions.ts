export const PATCH_APP_STATE = 'PATCH_APP_STATE';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

export const patchAppState = (appState: any) => ({
  type: PATCH_APP_STATE,
  appState,
});

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});