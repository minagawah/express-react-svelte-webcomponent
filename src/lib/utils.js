const CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com/';

export const addOne = (n = 0) => (n + 1);

export const cookieFactory = () => {
  const create = (name, value, msec = 0) => {
    if (!name) throw new Error('Need a cookie name');
    if (typeof value === 'undefined') throw new Error('Need a cookie value');
    let expires = '';
    if (msec) {
      const date = new Date();
      date.setTime(date.getTime() + msec);
      expires = `; expires=${date.toGMTString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  };

  const read = (name) => {
    if (!name) throw new Error('Need a cookie name');
    const match = `${name}=`;
    const all = document.cookie.split(';');
    const size = all.length;

    let value = null;
    for (let i = 0; i < size; i++) {
      let cookie = all[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(match) === 0) {
        value = cookie.substring(match.length, cookie.length);
        break;
      }
    }
    return value;
  };

  const remove = (name) => {
    create(name, '', -1);
  };

  return {
    create,
    read,
    remove,
  };
}

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
};
