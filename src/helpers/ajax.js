import { merge } from 'lodash';
import serialize from './serialize';

const request = (params) => {
  const options = merge({ cors: true, url: '' }, params);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method, options.url, true);

    if (typeof options.headers === 'object') {
      Object.keys(options.headers)
        .filter(keyName => typeof options.headers[keyName] !== 'undefined')
        .forEach(keyName => xhr.setRequestHeader(keyName, options.headers[keyName]));
    }

    if (options.cors) {
      xhr.withCredentials = true;
    }

    xhr.onload = () => {
      const isOK = xhr.status >= 200 && xhr.status < 400;
      const response = {
        status: {
          level: isOK ? 'success' : 'error',
          code: xhr.status,
          message: xhr.statusText,
        },
      };

      try {
        resolve({ ...response, message: JSON.parse(xhr.responseText) });
      } catch (ex) {
        reject({ ...response, message: xhr.responseText });
      }
    };

    xhr.onerror = reject;
    xhr.ontimeout = reject;

    return xhr.send(options.data);
  });
};

export const get = (url, options = {}) =>
  request({ url, method: 'get', ...options });

export const post = (url, data, options = {}) =>
  request({ url, data: JSON.stringify(data), method: 'post', ...options });

export const postForm = (url, data, options = {}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  };

  return request({ url, headers, data: serialize(data), method: 'post', ...options });
};

export const postJSON = (url, data, options = {}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };

  return request({ url, headers, data: JSON.stringify(data), method: 'post', ...options });
};
