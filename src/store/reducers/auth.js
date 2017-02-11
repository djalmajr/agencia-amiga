import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const emptyObject = {};

export const isAuthenticating = handleActions({
  [actions.login]: () => true,
  [actions.authorize]: () => false,
}, false);

export const isRegistering = handleActions({
  [actions.register]: () => true,
  [actions.authorize]: () => false,
}, false);

export const authData = handleActions({
  [actions.unauthorize]: () => emptyObject,
  [actions.authorize]: (state, { error, payload }) => (error ? {} : payload),
}, emptyObject);
