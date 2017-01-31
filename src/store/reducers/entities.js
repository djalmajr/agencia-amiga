import _ from 'lodash';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const byId = handleActions({
  [actions.unauthorize]: () => ({}),
  [actions.removeCache]: (state, { error, payload }) => {
    if (error) {
      return state;
    }

    const newState = _.merge({}, state);

    try {
      delete newState[payload.entity][payload.uid];

      return newState;
    } catch (err) {
      return state;
    }
  },
  [actions.updateCache]: (state, { error, payload }) => {
    if (error) {
      return state;
    }

    const newState = _.merge({}, state);

    _.forEach(payload.response, (val, key) => {
      if (!newState[payload.entity]) {
        newState[payload.entity] = {};
      }

      newState[payload.entity][key] = val;
    });

    return newState;
  },
}, {});

export const toRemove = handleActions({
  [actions.unauthorize]: () => ({}),
  [actions.remove]: (state, { payload }) => _.merge({}, state, { [payload.entity]: payload.uid }),
  [actions.removeCache]: (state, { payload }) => {
    const newState = _.merge({}, state);

    delete newState[payload.entity][payload.uid];

    return newState;
  },
}, {});

export const isFetching = handleActions({
  [actions.unauthorize]: () => ({}),
  [actions.read]: (state, { payload }) => _.assign({}, state, { [payload.entity]: true }),
  [actions.addToOrg]: (state, { payload }) => _.assign({}, state, { [payload.entity]: true }),
  [actions.updateCache]: (state, { error, payload }) => {
    if (error) {
      return {};
    }

    return _.assign({}, state, { [payload.entity]: false });
  },
}, {});

export const isRemoving = handleActions({
  [actions.unauthorize]: () => ({}),
  [actions.remove]: (state, { payload }) => _.assign({}, state, { [payload.entity]: true }),
  [actions.removeCache]: (state, { payload }) => {
    const newState = _.merge({}, state);

    delete newState[payload.entity][payload.uid];

    return newState;
  },
}, {});
