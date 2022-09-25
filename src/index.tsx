import { PersistGate } from 'redux-persist/integration/react';
import { persist, store } from 'core/store/store';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Header from 'components/Header';
import 'assets/styles/main.css';
import React from 'react';
import App from './App';
import 'core/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <Header/>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
