import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import { StoreProvider } from './store/StoreContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
