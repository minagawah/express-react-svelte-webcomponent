const CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com/';

export const corsAnywhere = (url, options = {}) => {
  let res = { url, options };
  if (typeof url === 'string' && typeof options === 'object' && url) {
    res.url = `${CORS_ANYWHERE_URL}${url}`;
    const xhr = { 'X-Requested-With': 'xhr' };
    const headers = ('headers' in options)
      ? { ...options.headers, ...xhr }
      : { ...xhr };
    res.options = { ...options, headers };
  }
  return res;
}
