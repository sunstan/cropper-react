import { combineReducers, AnyAction } from 'redux';
import storeDefault from './store.default';
import * as actions from './store.actions';
import appReducer from './app/app.reducer';
import { StoreState } from './store.model';

const reducers = combineReducers<StoreState>({
  app: appReducer,
});

const storeReducer = (state: StoreState = storeDefault, action: AnyAction): StoreState => {
  switch (action.type) {
    case actions.RESET_STORE: {
      return reducers(storeDefault, action);
    }
    default: {
      return reducers(state, action);
    }
  }
};

export default storeReducer;