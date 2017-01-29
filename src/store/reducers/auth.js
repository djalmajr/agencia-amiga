import _ from 'lodash';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const isAuthenticating = handleActions({
  [actions.login]: () => true,
  [actions.logout]: () => true,
  [actions.authorize]: () => false,
  [actions.unauthorize]: () => false,
}, false);

export const isRegistering = handleActions({
  [actions.register]: () => true,
  [actions.authorize]: () => false,
  [actions.unauthorize]: () => false,
}, false);

export const authData = handleActions({
  [actions.unauthorize]: () => ({}),
  [actions.authorize]: (state, { error, payload }) => {
    if (error) {
      return state;
    }

    return _.merge({}, state, payload);
  },
}, {});

export const userData = handleActions({
  [actions.unauthorize]: () => ({}),
  [actions.updateCache]: (state, { error, payload }) => {
    if (error || payload.entity !== 'users') {
      return state;
    }

    return _.merge({}, state, _.values(payload.response)[0]);
  },
}, {});
