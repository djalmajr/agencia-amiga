import _ from 'lodash';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const byId = handleActions({
  [actions.unauthorize]: () => ({}),
  [actions.updateCache]: (state, { error, payload }) => {
    if (error) {
      return state;
    }

    return _.merge({}, state, { [payload.entity]: payload.response });
  },
}, {});

export const isFetching = handleActions({
  [actions.unauthorize]: () => ({}),
  [actions.updateStatus]: (state, { payload }) => _.merge({}, state, {
    [payload.entity]: payload.status,
  }),
}, {});

export const visibleIds = handleActions({
  [actions.unauthorize]: () => ({}),
  [actions.updateCache]: (state, { error, payload }) => {
    if (error) {
      return state;
    }

    return _.merge({}, state, { [payload.entity]: _.keys(payload.response) });
  },
}, {});
