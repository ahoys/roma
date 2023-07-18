/**
 * Public path is used to set the root for the
 * web server. This is the URL-location where the
 * server and the files can be found.
 * I.e. domain.com/mypublicpath
 */
export const getPublicPath = (rawPublicPath: string | undefined): string => {
  let value = rawPublicPath || '/';
  if (!value.startsWith('/')) {
    value = '/' + value;
  }
  if (!value.endsWith('/')) {
    value = value + '/';
  }
  return value;
};

/**
 * Basename is used in client routing.
 */
export const getBasename = (rawPublicPath: string | undefined): string => {
  let value = getPublicPath(rawPublicPath);
  if (value.endsWith('/')) {
    value = value.substring(0, value.length - 1);
  }
  return value;
};
