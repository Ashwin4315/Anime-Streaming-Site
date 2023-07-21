import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { store } from './store/store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';


let persistor=persistStore(store);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate  persistor={persistor}>
          <App />
        </PersistGate>

      </BrowserRouter>
    </Provider>
);

reportWebVitals();
