import config from 'config';
import { useEffect, useLayoutEffect } from 'react';

/**
 * SSR does not support useLayoutEffect, that's why
 * we need to use different effects for the server and the client.
 */
export const useIsomorphicLayoutEffect = config.isBrowser
  ? useLayoutEffect
  : useEffect;
