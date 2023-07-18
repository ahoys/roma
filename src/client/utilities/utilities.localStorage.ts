interface ILocalStorage {
  [key: string]: string;
}

/**
 * Save to local storage.
 * @param payload The payload to save to local storage.
 */
export const saveToLocalStorage = (payload: ILocalStorage) => {
  for (const key of Object.keys(payload)) {
    localStorage.setItem(key, payload[key]);
  }
};

/**
 * Get from local storage.
 * @param key The key to get from local storage.
 * @returns The value from local storage.
 */
export const getFromLocalStorage = (key: string) => localStorage.getItem(key);
