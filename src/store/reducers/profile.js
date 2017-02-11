import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const isUpdatingProfile = handleActions({
  [actions.unauthorize]: () => false,
  [actions.updateProfile]: () => true,
  [actions.updateCache]: (state, { payload }) => payload.entity !== 'users',
}, false);

export const currentTabFeed = handleActions({
  [actions.unauthorize]: () => 'timeline',
  [actions.updateTabFeed]: (state, { payload }) => payload,
}, 'timeline');
