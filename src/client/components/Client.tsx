import React from 'react';
import config from 'config';
import { createStore } from '../store';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

if (config.isDevelopment && config.isBrowser) {
  console.info('You are in a development mode. App performance is degraded.');
  console.info(
    'Client-side config (that should not contain any secrets!):',
    config
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serverData = (window as any).__PRELOADED_STATE__;
const store = createStore(serverData);

delete (window as any).__PRELOADED_STATE__; // eslint-disable-line

const container = document.getElementById('client');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>
);
