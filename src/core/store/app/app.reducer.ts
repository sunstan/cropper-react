import * as actions from './app.actions';
import { AppState } from './app.model';
import appDefault from './app.default';
import { AnyAction } from 'redux';

const appReducer = (state: AppState = appDefault, action: AnyAction) => {
  switch (action.type) {
    case actions.PATCH_APP_STATE: {
      const { appState } = action;
      return { ...state, ...appState };
    }
    case actions.TOGGLE_DARK_MODE: {
      return { ...state, darkMode: !state.darkMode };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;