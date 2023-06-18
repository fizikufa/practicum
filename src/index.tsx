import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { legacy_createStore as createStore } from "redux";
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/root';
import { enhancer } from './utils/store';

const store = createStore(rootReducer, enhancer); 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);