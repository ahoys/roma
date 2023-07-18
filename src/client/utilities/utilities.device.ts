/**
 * Figures out if the given client device is a mobile device.
 * Used for determining the proper screenFormat.
 * @returns True if is a mobile device.
 */
export const isMobileDevice = (): boolean => {
  const userAgent = navigator?.userAgent;
  return userAgent
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      )
    : false;
};
