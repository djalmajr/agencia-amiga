import { merge } from 'lodash';
import localforage from 'localforage';
import { Cache } from '~/constants';

export const loadState = currentState => new Promise((resolve) => {
  localforage.getItem(Cache.KEY, (err, state = {}) => {
    if (err) {
      console.log(err); // eslint-disable-line
    }

    return resolve(merge({}, currentState, state));
  });
});

export const saveState = (state) => {
  localforage.setItem(Cache.KEY, state);
};
