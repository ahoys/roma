import 'regenerator-runtime/runtime';
import config from './client.config';
import { cacheNames } from 'workbox-core';
import { enable as navigationPreload } from 'workbox-navigation-preload';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkOnly, CacheFirst } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

const FALLBACK_HTML_URL = config.publicPath;

/**
 * Populate the cache with content even if offline.
 */
self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(cacheNames.runtime).then((cache) => {
      cache.add(FALLBACK_HTML_URL);
    })
  );
});

navigationPreload();

/**
 * Make sure offline is handled properly.
 */
const networkOnly = new NetworkOnly();
registerRoute(
  new NavigationRoute(async (params) => {
    try {
      // Attempt to fetch content.
      return await networkOnly.handle(params);
    } catch (error) {
      // Offline.
      return caches.match(FALLBACK_HTML_URL, {
        cacheName: cacheNames.runtime,
      });
    }
  })
);

/**
 * Serve from cache first. No worries, the filenames are hashed,
 * updates will get through.
 */
registerRoute(
  ({ url }) =>
    url.pathname.startsWith(config.publicPath + 'npm.') ||
    url.pathname.startsWith(config.publicPath + 'client.'),
  new CacheFirst({
    cacheName: cacheNames.precache,
  })
);
