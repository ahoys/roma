import React from 'react';
import config from 'config';
import { createStore } from '../store';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import { hydrateRoot } from 'react-dom/client';

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

/**
 * Client-side rendering.
 */
loadableReady(() => {
  hydrateRoot(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('client')!,
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});