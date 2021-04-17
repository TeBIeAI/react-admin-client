export const paramsFormatter = url => {
  const _from = url.indexOf('?') > 0 ? url.indexOf('?') + 1 : 0;
  if (_from > 0) {
    const obj = {};
    url
      .slice(_from)
      .split('&')
      .forEach(params => {
        const item = params.split('=');
        obj[item[0]] = item[1];
      });
    return obj;
  } else {
    return false;
  }
};

export function setStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getStorage(name) {
  const data = localStorage.getItem(name) || '[]';
  return JSON.parse(data);
}

export function removeStorage(name) {
  localStorage.removeItem(name);
}
