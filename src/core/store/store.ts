import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist'
import {applyMiddleware, legacy_createStore} from 'redux';
import storage from 'redux-persist/lib/storage';
import StoreReducer from './store.reducer';

const persistConfig = {
  key: 'store',
  storage,
  whitelist: ['app', 'images'],
}

const middlewares: any = [];

if (process.env.NODE_ENV !== `production`) {
  const {createLogger} = require(`redux-logger`);
  const logger = createLogger({collapsed: true, duration: true});
  middlewares.push(logger);
}

export const store = legacy_createStore(
  persistReducer(persistConfig, StoreReducer),
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persist = persistStore(store);